import React from "react";

const NotificationError = ({messageError}) => {
    if(messageError === null){
        return null
    }

    return(
        <div className="errorMessage">
            {messageError}
        </div>
    )
}

export default NotificationError