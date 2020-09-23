import React, { useEffect } from 'react';
import FilterableTable from 'react-filterable-table'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import './App.css';

function App() {
  const [initialData, setInitialData] = React.useState([]);
  const fields = [
    { type: "text", required: true, name: 'nickname', displayName: "Nickname", inputFilterable: true, sortable: true },
    { type: "text", required: true, name: 'fcname', displayName: "Carrier Name", inputFilterable: true, exactFilterable: true, sortable: true },
    { type: "text", required: true, name: 'route', displayName: "Route", inputFilterable: true, exactFilterable: true, sortable: true },
    { type: "date", required: true, name: 'depDate', displayName: "Departure Date", inputFilterable: true, exactFilterable: true, sortable: true },
    { type: "time", required: true, name: 'depTime', displayName: "Time (UTC)", inputFilterable: true, sortable: true },
    { type: "date", required: true, name: 'destDate', displayName: "Arrival Date", inputFilterable: true, sortable: true },
    { type: "time", required: true, name: 'desTime', displayName: "Time (UTC)", inputFilterable: true, exactFilterable: true, sortable: true },
    { type: "text", name: 'notes', displayName: "Notes", inputFilterable: true }
  ];
  useEffect(() => {
    const callApi = async () => {
      try {
        const data = await fetch('https://ironfists.azurewebsites.net/trip').then(result => result.json())
        setInitialData(data);
      } catch (error) {
        console.error("useEffect: ", error)
      }
    }
    callApi();
  }, []);
  return (
    <div className="App">
      <img alt="logo" class="logo" width="40px" src="logo512.png"/>
      <h1>Elite Trip Board</h1>
      <p>Headed somehwere?</p>
      <FilterableTable
        namespace="People"
        initialSort="name"
        data={initialData}
        fields={fields}
        noRecordsMessage="There are no trips to display"
        noFilteredRecordsMessage="No trips match your filters!"
      />
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
              Log Your trip <span class="fa fa-angle-down"></span>
        </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <p>Note: This is quickly hacked up and therefore its not easy to remove stuff be careful</p>
              <form method="POST" action="https://ironfists.azurewebsites.net/trip">
                <div class="form-group">
                  {fields.map(element =>
                    <span>
                      <label for={element.name}>
                        {element.displayName}
                      </label>
                      <input id={element.name} name={element.name} type={element.type} class="form-control" required={element.required} />
                    </span>
                  )}
                </div>
                <button type="submit" class="btn btn-warning">Submit</button>
              </form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

    </div>
  );
}

export default App;
