import ReactDataGrid from "react-data-grid";

export const userColumns = [
    {
        //selector: '<div className="cellWithImg"> <img className="cellImg" src="imgTeam" alt="avatar" /></div>',
        name: "Image",
        width: "140px",
        //formatter: ReactDataGridPlugins.Formatters.ImageFormatter,
        cell: (params) =>  (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.imgTeam} alt="avatar" />
                </div>
            )
    },
    {
        selector: (row) => row.Name,
        name: "Name",
        width: "150px",
        editable: true,
    },
    {
        selector: (row) => row.Post,
        name: "Position",
        width: "150px",
        editable: true,
    },
    {
        selector: (row) => row.Facebook,
        name: "Facebook",
        width: "150px",
        editable: true,
    },
    {
        selector: (row) => row.Instagram,
        name: "Instagram",
        width: "150px",
        editable: true,
    },
    {
        selector: (row) => row.Twitter,
        name: "Twitter",
        width: "150px",
        editable: true,
    },
    {
        selector: (row) => row.LinkedIn,
        name: "LinkedIn",
        width: "150px",
        editable: true,
    }
];