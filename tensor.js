// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "./my_model/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function 
init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // 모델과 메타 데이터를 load 한다.
    // pose 라이브러리가 "tmImage" 객체를 window에 추가한다.
    model = await tmImage.load(modelURL, metadataURL);
    // 모델을 로드한 후에는 모델의 총 클래스 수를 얻을 수 있다.
	maxPredictions = model.getTotalClasses();
	

    // 웹캠 편의 기능 설정 부분
    const flip = true; // 웹캠의 반전 여부
    webcam = new tmImage.Webcam(400, 400, flip); // 웹캠의 넓이, 높이, 반전여부
    await webcam.setup(); // 웹캠 setup(셋업 혹은 접속) 요청
    await webcam.play(); // 웹캠 play
    window.requestAnimationFrame(loop);	// 브라우저에게 수행하길 원하는 애니메이션을 알리고 다음 리페인팅이 진행되기 전에 해당 애니메이션을 업데이트 하는 과정.

    // elements를 DOM에 추가.
	// webcam-container 및 webcam.canvas 속성을 추가
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // "div"의 HTML 요소를 만들어 반환
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); //webcam frame을 업데이트
    await predict();
    window.requestAnimationFrame(loop);
}

async function update() {
    webcam.update(); 
}

// 이미지 모델에 웹캠 이미지를 실행
async function predict() {
    // html의 요소인 이미지, 비디오, 캔버스를 포함 할 수 있다.
    const prediction = await model.predict(webcam.canvas);

 
    // //mask-On
    // const classPrediction_maskon = prediction[0].probability.toFixed(2)*100 ;
    // //labelContainer.childNodes[1].innerHTML = "<h1>" + classPrediction_maskon +"%" +"<h1>";
    // document.getElementsByTagName("progress")[0].value=classPrediction_maskon;
	// // 탐색을 통해 "progress"와 일치하는 값을 찾음.

 
    // //mask-Off
    // const classPrediction_maskoff = prediction[1].probability.toFixed(2)*100 ;
    // //labelContainer.childNodes[1].innerHTML = "<h1>" + classPrediction_maskoff +"%" +"<h1>";
    // document.getElementsByTagName("progress")[1].value=classPrediction_maskoff;
	// // 탐색을 통해 "progress"와 일치하는 값을 찾음.
    


    /*
    //JYT-ON
    const classPrediction_jyton = prediction[0].probability.toFixed(2)*100 ;
    document.getElementsByTagName("progress")[0].value=classPrediction_jyton;
    //JYT-OFF
    const classPrediction_jytoff = prediction[1].probability.toFixed(2)*100 ;
    document.getElementsByTagName("progress")[1].value=classPrediction_jytoff;
    //JYJ-On
    const classPrediction_jyjon = prediction[2].probability.toFixed(2)*100 ;
    document.getElementsByTagName("progress")[2].value=classPrediction_jyjon;
    //JYJ-OFF
    const classPrediction_jyjoff = prediction[3].probability.toFixed(2)*100 ;
    document.getElementsByTagName("progress")[3].value=classPrediction_jyjoff;
    //NOT-DETECTED
    const classPrediction_none = prediction[4].probability.toFixed(2)*100 ;
    document.getElementsByTagName("progress")[4].value=classPrediction_none;
    */

    //JBR_NO
    const classPrediction_jbrno = prediction[0].probability.toFixed(2)*100 ;
    document.getElementsByTagName("progress")[0].value=classPrediction_jbrno;
    //JYJ_NO
    const classPrediction_jyjno = prediction[1].probability.toFixed(2)*100 ;
    document.getElementsByTagName("progress")[1].value=classPrediction_jyjno;
    //JYT_NO
    const classPrediction_jytno = prediction[2].probability.toFixed(2)*100 ;
    document.getElementsByTagName("progress")[2].value=classPrediction_jytno;
    //PHS_NO
    const classPrediction_phsno = prediction[3].probability.toFixed(2)*100 ;
    document.getElementsByTagName("progress")[3].value=classPrediction_phsno;
    //NOT-DETECTED
    const classPrediction_none = prediction[4].probability.toFixed(2)*100 ;
    document.getElementsByTagName("progress")[4].value=classPrediction_none;
    

  /*
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }*/

}
