export const serviceColumns = [
    {
        field: "Description",
        headerName: "Description",
        width: 140,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.imgTeam} alt="avatar" />
                </div>
            );
        },
    },
    {
        field: "Image",
        headerName: "Image",
        width: 150,
    },

    {
        field: "Name",
        headerName: "Name",
        width: 150,
    },
    {
        field: "Vector",
        headerName: "Vector",
        width: 160,
    },

];