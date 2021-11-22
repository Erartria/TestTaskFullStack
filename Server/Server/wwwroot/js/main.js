function draw() {
    let canvas = new Konva.Stage({
        container: "container",
        width: window.innerWidth,
        height: window.innerHeight
    });
    let layer = new Konva.Layer();
    let groups = new Konva.Group();
    sendAjaxRequest("get", "/api/dot").then(data => {
        data.forEach(jsonDot => {
            let dotAndCommentGroup = new Konva.Group({
                name: jsonDot.id
            });
            let dot = makeDot(jsonDot.x, jsonDot.y, jsonDot.radius, jsonDot.color, jsonDot.id);
            dotAndCommentGroup.add(dot)
            dot.on("dblclick", () => dblclickHandler(jsonDot, dotAndCommentGroup, layer))
            let commentGroup = createGroupOfComments(jsonDot.comments, jsonDot.x, jsonDot.y, (jsonDot.radius + 10));
            dotAndCommentGroup.add(commentGroup)
            groups.add(dotAndCommentGroup)
        })
        layer.add(groups);
    })
        .catch(() => {
            window.alert("Something went wrong")
        })
    canvas.add(layer);
}

function sendAjaxRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method.toUpperCase(), url, true);

        xhr.responseType = "json";
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status === 200)
                resolve(xhr.response);
            else
                reject(xhr.response);
        }

        xhr.onerror = () => {
            reject(xhr.response);
        }
        if (body != null)
            xhr.send(JSON.stringify(body));
        else
            xhr.send(body);
    });
}

function makeDot(x, y, r, fill, name) {
    return new Konva.Circle({
        x: x,
        y: y,
        radius: r,
        fill: fill,
        name: name
    });
}

function createGroupOfComments(comments,
                               x,
                               y,
                               offsetY,
                               between = 5,
                               textSize = 18,
                               textColor = "black") {
    let group = new Konva.Group()
    for (let i = 0; i < comments.length; i++) {
        let label = new Konva.Label({
            x: x - comments[i].text.length * textSize / 1.328 / 2.9,
            y: y + offsetY + i * (textSize * 1.328 + 3 + between)
        });
        let tag = new Konva.Tag({
            fill: comments[i].backgroundColor,
            stroke: "black",
            strokeWidth: 1
        });

        let text = new Konva.Text({
            padding: 3,
            text: comments[i].text,
            fontFamily: 'TimesNewRoman',
            fontSize: textSize,
            fill: textColor,
            name: comments[i].id
        });
        label.add(tag, text);
        group.add(label);
    }
    return group
}

function dblclickHandler(jsonDot, dotAndCommentGroup, layer) {
    sendAjaxRequest("delete", "/api/dot/" + jsonDot.id)
        .then(() => {
            dotAndCommentGroup.destroy();
            layer.draw();
        })
        .catch(() => {
            window.alert("Selected dot is not existed at DB")
        })
}