import "./App.css";
import TableComponent from "./TableComponent";
import { useSelector } from "react-redux";

function App() {
  const data = useSelector((state: ReduxValueType) => state.data.value);

  const renderHeader = () =>
    Object.keys(data[`${data.root.childrens[0]}`].data).map(
      (header: string, index: number) =>
        header !== "uuid" && (
          <th
            key={index}
            className={`column-${header.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
          >
            {header}
          </th>
        )
    );

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Interactive hierarchical table with recursive data structure.</h1>
      </header>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {data.root !== undefined && data.root.childrens.length !== 0 && (
                <>
                  <th>Rozbalit</th>
                  {renderHeader()}
                  <th>Smazat</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.root !== undefined &&
              data.root.childrens?.map((uuid: string, index: number) => {
                return (
                  <TableComponent
                    key={index}
                    data={data}
                    uuid={uuid}
                    showChildrens={data[`${uuid}`].showChildrens}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;
