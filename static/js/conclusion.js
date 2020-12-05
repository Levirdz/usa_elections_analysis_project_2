var ctx = document.getElementById("raceChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    height: 260,
    options: {
        scales: {
            yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
        }
    },
    data: {
        labels: ["Biden", "Trump"],
        datasets: [{
            label: 'Amount of wins in top 10 states based on race',
            data: [5, 5],
            backgroundColor: [
                'rgba(44, 130, 201, 1)',
                'rgba(240, 52, 52, 1)'
              ]
        }]
    },
    });

var ctx = document.getElementById("povertyChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    height: 260,
    options: {
        scales: {
            yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
        }
    },
    data: {
        labels: ["Biden", "Trump"],
        datasets: [{
            label: 'Amount of wins in top 10 states based on poverty',
            data: [3, 7],
            backgroundColor: [
                'rgba(44, 130, 201, 1)',
                'rgba(240, 52, 52, 1)'
              ]
        }]
    },
    });

var ctx = document.getElementById("femaleChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    height: 260,
    options: {
        scales: {
            yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
        }
    },
    data: {
        labels: ["Biden", "Trump"],
        datasets: [{
            label: 'Amount of wins in top 10 states based on female rate',
            data: [7, 3],
            backgroundColor: [
                'rgba(44, 130, 201, 1)',
                'rgba(240, 52, 52, 1)'
              ]
        }]
    },
    });
    
var ctx = document.getElementById("maleChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    height: 260,
    options: {
        scales: {
            yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
        }
    },
    data: {
        labels: ["Biden", "Trump"],
        datasets: [{
            label: 'Amount of wins in top 10 states based on male rate',
            data: [1, 5],
            backgroundColor: [
                'rgba(44, 130, 201, 1)',
                'rgba(240, 52, 52, 1)'
              ]
        }]
    },
    });