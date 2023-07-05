interface GraphData {
  name: string;
  total: number;
}

export const getSales = () => {
  const graphData: GraphData[] = [
    { name: "Jan", total: 10 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 23 },
    { name: "Apr", total: 50 },
    { name: "May", total: 9 },
    { name: "Jun", total: 12 },
    { name: "Jul", total: 29 },
    { name: "Aug", total: 119 },
    { name: "Sep", total: 250 },
    { name: "Oct", total: 75 },
    { name: "Nov", total: 50 },
    { name: "Dec", total: 60 },
  ];

  return graphData;
};
