export const serviceColumns = [
    {
        //selector: (row) => row.Image,
        name: "Image",
        width: "250px",
        cell: (params) =>  (
            <div className="cellWithImg">
                <img className="cellImg" src={params.Image} alt="avatar" />
            </div>
        )

    },

    {
        selector: (row) => row.Name,
        name: "Name",
        width: "250px",
    },
    {
        selector: (row) => row.Description,
        name: "Description",
        width: "260px",
    },
    {
        //selector: (row) => row.Vector,
        name: "Vector",
        width: "260px",
        cell: (params) =>  (
            <div className="cellWithImg">
                <img className="cellImg" src={params.Vector} alt="avatar" />
            </div>
        )
    },

];