import { useMemo } from "react";

const UserTableColumn = ()  =>{ 
	
    const columns = useMemo(
        () => [
          {
            // first group - TV Show
            Header: "TV Show",
            // First group columns
            columns: [
              {
                Header: "UserName",
                accessor: "UserName"
              },
              {
                Header: "Email",
                accessor: "Email"
              }
            ]
          },
          {
            // Second group - Details
            Header: "Details",
            // Second group columns
            columns: [
              {
                Header: "Role",
                accessor: "Role"
              },
              {
                Header: "verification",
                accessor: "verification"
              }
            ]
          }
        ],
        []
      );
	
	return (columns);
}

export default UserTableColumn;