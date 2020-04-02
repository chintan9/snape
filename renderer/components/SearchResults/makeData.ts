import timeAgo from "time-ago";
import { TorrentResult } from "../../../types/TorrentResult";

const columns = [
  { Header: "#", accessor: "index" },
  {
    Header: "Name",
    accessor: "title",
  },
  {
    Header: "Size",
    accessor: "size",
  },
  {
    Header: "Seeds",
    accessor: "seeds",
  },
  {
    Header: "Peers",
    accessor: "peers",
  },
  {
    Header: "Added",
    accessor: "time",
  },
];

export function makeData(results: TorrentResult[]) {
  return {
    columns,
    data: results.map((datum, i) => {
      const date = new Date(datum.time).getTime();
      return {
        ...datum,
        index: i + 1,
        time: isNaN(date) ? datum.time : `${timeAgo.ago(date, true)} ago`,
      };
    }),
  };
}