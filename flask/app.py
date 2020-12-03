import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///../data/usa_elections_2020_db.sqlite")
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
    return( 
        f"Available Routes:<br/>"
        f"/api/v1.0/census<br/>"
        f"/api/v1.0/president"
    )

@app.route("/api/v1.0/census")
def census(): 
    # Creating a session from Python to DB 
    session = Session(engine)

    results = session.query(Census).all()

    session.close()




if __name__ == "__main__":
    app.run()