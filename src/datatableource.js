export const userColumns = [
    {
        field: "imgTeam",
        headerName: "Image",
        width: 140,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.imgTeam} alt="avatar" />
                </div>
            );
        }
    },
    {
        field: "Name",
        headerName: "Name",
        width: 150,
        editable: true,
    },

    {
        field: "Post",
        headerName: "Position",
        width: 150,
        editable: true,
    },
    {
        field: "Facebook",
        headerName: "Facebook",
        width: 160,
        editable: true,
    },
    {
        field: "Instagram",
        headerName: "Instagram",
        width: 160,
        editable: true,
    },
    {
        field: "Twitter",
        headerName: "Twitter",
        width: 160,
        editable: true,
    },
    {
        field: "LinkedIn",
        headerName: "LinkedIn",
        width: 160,
        editable: true,
    },
];