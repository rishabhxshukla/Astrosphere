function lerp(start, stop, t, margin = 1) 
{
    if (Math.abs(start - stop) < margin) return stop;
    return start + (stop - start) * t;
}

/* SCROLL PARALLAX */
class ScrollParallax 
{
    constructor() 
    {
        const t = this;

        t.scrollElement = document.documentElement;
        t.pageScroll = 0;

        t.updateScroll = function () {
            t.pageScroll = t.scrollElement.scrollTop;
        }
        window.addEventListener("scroll", t.updateScroll, true);

        t.offset = 0;
        t.easeAcc = 0.05;
        t.tracking = true;

        t.elements = {};
        t.oldProperties = {};

        t.trackInterval = setInterval(function () {

            if (!t.tracking) return null;
            t.offset = lerp(t.offset, -t.pageScroll, t.easeAcc);
            for (const [key, value] of Object.entries(t.elements)) {
                if (document.getElementById(key) == null) continue;
                document.getElementById(key).style.transform = `translate(0px,${t.offset * value}px)`;//each element's value determines the effect of the parallax

            }
        }, 10);
    }

    enable(elementId, depth) 
    {
        let element = document.getElementById(elementId);
        this.elements[elementId] = depth;
        this.oldProperties[elementId] = [element.style.position, element.style.zIndex, element.style.transform];
        if (element.style.position == "static" || element.style.position == "") element.style.position = "relative";
        element.style.zIndex = depth * 1000;
    }

    disable(elementId) 
    {
        let element = document.getElementById(elementId);
        element.style.position = this.oldProperties[elementId][0];
        element.style.zIndex = this.oldProperties[elementId][1];
        element.style.transform = this.oldProperties[elementId][2];
        delete this.oldProperties[elementId];
        delete this.elements[elementId];
    }
}

let earthParallaxScene = new ScrollParallax();
earthParallaxScene.enable("sloganHeader", 0.3);
earthParallaxScene.enable("sloganSub", 0.1);