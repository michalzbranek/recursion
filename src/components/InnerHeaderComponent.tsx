function InnerHeaderComponent({ data, uuid }: InnerHeaderProps) {
  return (
    <thead>
      <tr>
        {data[`${uuid}`].childrens.length !== 0 && <th>Rozbalit</th>}
        {data[`${uuid}`].childrens.length !== 0 &&
          Object.keys(data[`${data[`${uuid}`].childrens[0]}`].data).map(
            (header: string, index: number) =>
              header !== "uuid" && (
                <th
                  key={index}
                  className={`column-${header.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
                >
                  {header}
                </th>
              )
          )}
        {data[`${uuid}`].childrens.length !== 0 && <th>Smazat</th>}
      </tr>
    </thead>
  );
}
export default InnerHeaderComponent;
