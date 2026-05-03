function dragElement(careerElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    careerElement.onpointerdown = pointerDrag;

    function pointerDrag(e) {
        e.preventDefault();
        console.log(e);
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointermove = elementDrag;
        document.onpointerup = stopElementDrag;
    }

    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        careerElement.style.top = (careerElement.offsetTop - pos2) + 'px';
        careerElement.style.left = (careerElement.offsetLeft - pos1) + 'px';
    }

    function stopElementDrag() {
        document.onpointerup = null;
        document.onpointermove = null;
    }
}

dragElement(document.getElementById('option1'));
dragElement(document.getElementById('option2'));
dragElement(document.getElementById('option3'));
dragElement(document.getElementById('option4'));
dragElement(document.getElementById('option5'));
dragElement(document.getElementById('option6'));
dragElement(document.getElementById('option7'));
dragElement(document.getElementById('option8'));
dragElement(document.getElementById('option9'));
dragElement(document.getElementById('option10'));
dragElement(document.getElementById('option11'));
dragElement(document.getElementById('option12'));
dragElement(document.getElementById('option13'));
dragElement(document.getElementById('option14'));