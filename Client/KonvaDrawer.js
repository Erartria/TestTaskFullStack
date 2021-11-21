//import Konva from 'konva'
class KonvaDrawer {
    constructor(divId, width, height) {
        this.pixelInMasterSize = 1.338307;
        this.canvas = new Konva.Stage({
            container: divId,
            width: width,
            height: height
        });
    }
    makeDot(x, y, r, fill, name) {
        return new Konva.Circle({
            x: x,
            y: y,
            radius: r,
            fill: fill,
            name: name
        });
    }
    createGroupOfComments(comments, x, y, offsetY, between = 5, textSize = 18, textColor = "#d0d0d0", labelPadding = 3) {
        let group = new Konva.Group();
        for (let i = 0; i < comments.length; i++) {
            let label = new Konva.Label({
                x: x - (comments[i].text.length) * textSize / this.pixelInMasterSize / 2.9,
                y: y + offsetY + i * this.pixelInMasterSize * (textSize + labelPadding / 2 + between)
            });
            let tag = new Konva.Tag({
                fill: comments[i].backgroundColor,
                stroke: "black",
                strokeWidth: 2
            });
            let text = new Konva.Text({
                padding: labelPadding,
                text: comments[i].text,
                fontFamily: 'TimesNewRoman',
                fontSize: textSize,
                fill: textColor,
                name: comments[i].id
            });
            label.add(tag, text);
            group.add(label);
        }
        ;
        return group;
    }
    canvasAddLayer(layer) {
        this.canvas.add(layer);
    }
    makeLayer() {
        return new Konva.Layer();
    }
    reloadCanvas() {
        this.canvas.draw();
    }
}
export default KonvaDrawer;
