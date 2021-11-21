import HttpClient from "./HttpClient.js";
import KonvaDrawer from "./KonvaDrawer.js";

const myClient = new HttpClient("https://localhost:5001");
const myDrawer = new KonvaDrawer("canvas", window.innerWidth, window.innerHeight);

function Draw() {
    let layer = myDrawer.makeLayer();
    myClient.sendAjaxRequest("get", "/api/dot").then(dots => {
        dots.forEach(d => {
            let dot  = myDrawer.makeDot(d.x, d.y, d.radius, d.color, d.id);
            let commentBlock : any = myDrawer.createGroupOfComments(d.comments, d.x, d.y, d.radius + 10);
            let dotWithComments = commentBlock.add(dot)
            dot.on("dblclick", () => dblclickHandler(dotWithComments, d.id, layer))
            layer.add(dotWithComments)
        })
        myDrawer.canvasAddLayer(layer);
    })
        .catch(() => window.alert("Can't get data from service"));
}

function dblclickHandler(group, dotId: number, layer) {
    myClient.sendAjaxRequest("delete", "/api/dot/" + dotId)
        .then(()=> {
            group.destroy();
            layer.draw();
        })
        .catch(() => {
            window.alert(`Dot with id ` + dotId + ` doesn't exist at db`)
        })
}

Draw();
