# react-coverage-output

The purpose of this project is to read in a json file and output it in a meaningful way.
Initially the data will be outputted to a table.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need npm installed.

### Installing

`npm install`
To run the project please use `npm run dev`.
This will load the projectr on this address `http://localhost:8080/`

## Running the tests

To run the javascript tests please use `npm run tests`
To run the eslint tests please use `npm run lint`

### What I missed

So as I was cleaning my code i moved a few bits into new functions which i didnt have time to write tests for.
I would have liked to get total coverage report done.

The data pivoting was hard. It works with the smaller sample but not with the bigger dataset as the file names were slightly different. Also mine only works for one level down. To do multi levels ill need to use recursion.

### Next version

In the next version as well as what ive missed the new features will be:
	Data Export
	Running real tests and outputting it in a table
	Different chart types, the user can choose what to use.
	User to select the json file.