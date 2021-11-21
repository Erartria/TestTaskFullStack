//import Konva from 'konva'

class KonvaDrawer {

    canvas!: Konva.Stage;
    pixelInMasterSize: number = 1.338307;

    public constructor(divId: string, width: number, height: number) {
        this.canvas = new Konva.Stage({
            container: divId,
            width: width,
            height: height
        });

    }

    public makeDot(x: number, y: number, r: number, fill: string, name: string): Konva.Circle {
        return new Konva.Circle({
            x: x,
            y: y,
            radius: r,
            fill: fill,
            name: name
        });
    }

    public createGroupOfComments(comments: any, x: number, y: number,
                                 offsetY: number,
                                 between = 5,
                                 textSize = 18,
                                 textColor = "#d0d0d0",
                                 labelPadding = 3): Konva.Group {
        let group = new Konva.Group();
        for (let i: number = 0; i < comments.length; i++) {
            let label = new Konva.Label({
                x: x - (comments[i].text.length) * textSize / this.pixelInMasterSize / 2.9,
                y: y + offsetY + i * this.pixelInMasterSize * (textSize + labelPadding/2 + between)
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
        };
        return group;
    }

    public canvasAddLayer(layer: Konva.Layer): void {
        this.canvas.add(layer);
    }

    public makeLayer() : Konva.Layer {
        return new Konva.Layer();
    }

    public reloadCanvas() : void {
        this.canvas.draw();
    }
}

export default KonvaDrawer;