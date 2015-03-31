# Simple angular grid

## Run

`npm start`

app is at `http://localhost:8000/index.html`

## Grid features
- Sorting A-Z optional for each column
- Inline cell editing optional
- Filtering optional for each column
- The grid render different column types

Column types

### normal string column
- filtering, yes, string input field
- sorting button, yes A->Z | Z-A  
- if field is editable is configurable. 
- double click on string switches from display the string -> input with string
- press enter 'saves' the change -> input disappears -> only string visible

----------
### boolean column
- filtering yes, true | false checkbox
- sorting no
- if true -> make green background
- if false -> make red background
- on click -> toggle between true and false



