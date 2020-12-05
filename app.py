import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, render_template, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///usa_elections_2020_db.sqlite")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# Save references to the tables
Census = Base.classes.census
President = Base.classes.president_county_candidate


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    """List of all available API routes.""" 
    return render_template("main.html")

@app.route("/election-map/")
def map(): 
    return render_template("electionmap.html")

@app.route("/dashboard/")
def dashboard(): 
    return render_template("dashboard.html")

@app.route("/conclusion/")
def conclusion(): 
    return render_template("conclusion.html")

@app.route("/api/demographics/")
def demographics(): 
    demo = pd.read_sql_query('''select 
    state,
    population, 
    population_mal_18 as per_population_mal_18, 
    population_fem_18 as per_population_fem_18, 
    population_18 as per_population_18, 
    poverty_count as poverty_count, 
    poverty_rate as per_poverty_rate, 
    pop_race_sum as pop_race_sum, 
    pop_white as per_pop_white,  
    pop_black_afr_american as per_pop_black_afr_american, 
    pop_american_indian_alaska as per_pop_american_indian_alaska,  
    pop_asian as per_pop_asian,  
    pop_native_hawaiian_pacific_islands as per_pop_native_hawaiian_pacific_islands
    from census''', engine)

    demo_json = demo.to_dict(orient = "records")
    return jsonify(demo_json)

@app.route("/api/county/<state>")
def county_candidate(state): 
    res = pd.read_sql_query(f'''select * from president_county_candidate where state = "{state}"
    ''', engine)

    res_json = res.to_dict(orient = "records")
    return jsonify(res_json)

@app.route("/api/states/")
def states(): 
    res = pd.read_sql_query(f'''select distinct state from president_county_candidate''', engine)
    res_json = res.to_dict(orient = "records")
    return jsonify(res_json)

if __name__ == "__main__":
    app.run(debug=True)