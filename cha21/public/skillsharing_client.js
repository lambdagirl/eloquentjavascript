function handleAction(state, action){
    if (action.type == "setUser"){
        localStorage.setItem("userName", action.user);
        return Object.assign({}, state, {user:action.user});
    } else if (action.type = "setTalks"){
        return Object.assign({}, state, {talk:action.talks});
    } else if (action.type == "newTalk"){
        fetchOK(talkURL(action.title), {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                presenter:state.user,
                summary:action.summary
            })
        }).catch(reportError);
    } else if (action.type == "deleteTalk"){
        fetchOK(talkURL(action.talk),{method:"DELETE"})
        .catch(reportError);
    } else if (action.type = "newComment") {
        fetchOK(talkURL(action.talk) + "./comments", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                author:state.user,
                message:action.message
            })
        }).catch(reportError);
    }
    return state
}

function fetchOK(url, options) {
    return fetch(url, options).then(response => {
        if(response.status <400) return response;
        else throw new Error(response.statusText);
    });
}
function talkURL(title){
    return "talk/" + encodeURIComponent(title);
}

function reportError(error){
    alert(String(error));
}