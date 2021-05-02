import React from "react";
import Popup from 'reactjs-popup';

// for Styling: https://react-popup.elazizi.com/css-styling

function Entry(props){

    function deleteE()
    {
        props.deleteEntry(props.id);
    }

    return (
        <div className="entry">
          <Popup role="dialog" trigger={<button className="entryButton"><div>{props.categoryName}</div></button>} modal>
            {close => (
              <div>
               <iframe width="900px" height="600px" title={props.videoID} src={"https://www.youtube.com/embed/" + props.videoID + "?autoplay=1"} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                <a className="close" onClick={close}>
                &times;
                </a>
              </div>
            )}
          </Popup>
            <button onClick={deleteE} className="deleteEntryButton" ><i className="fas fa-trash-alt deleteEntryIcon"></i></button>
        </div>
    )
}

export default Entry;