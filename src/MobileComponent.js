import { questions } from './questionData';
//import { StyleSheet, Text, View } from 'react';
import React, { useState } from 'react';

const MobileComponent = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answer, setAnswer] = useState(0);

    const handleStartClick = () => {
        setShowQuestions(true);
      };

    const handleOptionClick = (option, index) => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        setSelectedOption(option);
      //   if (nextQuestionIndex < questions.length) {
      //     setCurrentQuestionIndex(nextQuestionIndex);
      //     setAnswer(answer + option.score)
      //   } else {
      //     console.log(nextQuestionIndex);
      //     setShowResults(true);
      //   }
      
      // setSelectedOption(null); // Reset the selection for the next question

        setTimeout(() => {
            if (nextQuestionIndex < questions.length) {
                setCurrentQuestionIndex(nextQuestionIndex);
                setAnswer(answer + option.score)
              } else {
                setShowResults(true);
              }
            
            setSelectedOption(null); // Reset the selection for the next question
          }, 300); // Wait for 0.5 seconds

    };

    const getDepressionLevel = (score) => {
        if (score <= 10) return "正常情绪波动";
        if (score <= 16) return "轻度情绪扰乱";
        if (score <= 20) return "边缘性临床抑郁";
        if (score <= 30) return "中度抑郁";
        if (score <= 40) return "重度抑郁";
        return "极度抑郁";
      };
    
      const progress = ((currentQuestionIndex) / (questions.length)) * 100;


    return (
       <div style={styles.container}>
        {!showResults ? (
            <div>
            {!showQuestions ? ( // 条件渲染问题页面或开始按钮
                <div style={styles.start}>
                    <h2>Beck Depression Inventory (贝克抑郁量表)</h2>
                    <p>BDI测试表格1961年起草，根据抑郁症的专业机构指标的不断改进，也在不断调整。</p>
                    <p>它的严密和准确性也有很高的validility and reliability得分。被翻译成近20种语言，被各种机构应用。</p>
                    <p>请根据自己最近的情况，如实回答以下问题。</p>
                    <p>问卷需要10-15分钟完成。</p>
                    
                    <button onClick={handleStartClick} style={styles.button}>开始</button>
                </div>
            ) : (
                <div style={styles.buttonContainer}>
                    {/* <div style={styles.progressBar}>
                        <div style={{ width: `${progress}%`, backgroundColor: 'grey', height: 10 }}></div>
                    </div> */}
                    <div style={styles.progressBar}>
                      <div style={styles.bgbar}>
                        <div style={{ ...styles.progress, width: `${progress}%` }}>
                            <div style={styles.progressIndicator}></div>
                        </div>
                      </div>
                      <span style={styles.progressLabel}>{`${currentQuestionIndex + 1}/${questions.length}`}</span>
                    </div>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <div key={index} style={styles.wrap}> 
                            {/* <input type="checkbox" checked={false} onClick={() => handleOptionClick(option.score)}/> */}
                            <input 
                                type="checkbox" 
                                checked={selectedOption === option}
                                onChange={() => handleOptionClick(option, index)}
                                // checked={optionChecked[index]} 
                                // onMouseDown={() => handleOptionClick(option.score, index)}
                                // onMouseUp={() => handleOptionUnClick(option.score, index)}
                            />
                            <button style={styles.optionButton} onClick={() => handleOptionClick(option, index)}>
                                {option.text}
                            </button>
                        </div>
                    ))}
                    
                </div>
            )}
            </div>
        ) : (
            <div style={styles.start}>
            <p>恭喜您完成了所有问题。</p>
            <p>评测结果： 您的抑郁程度得分为{answer}，属于{getDepressionLevel(answer)}。</p>
            <p>此评测为自测，如有疑虑请预约专业评估机构进行评测。</p>
            </div>
        )}
    </div>
    );
}

const styles = {
    container: {
      flex:1,
      backgroundColor: '#fff',
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', 
    },
    start: {
      //border: '2px solid #000',
      marginTop:'20%',
      padding : '30px',
      textAlign: 'center',
      fontSize:16,
      display: 'flex', // 使用 Flexbox 布局
      flexDirection: 'column', // 设置主轴方向为垂直方向
      alignItems: 'center', // 在主轴方向上居中
      justifyContent: 'center', // 在水平方向上居中对齐
      //minHeight: '100vh', // 使 start 元素占据整个视口高度
     
    },
    button: {
      backgroundColor: '#fff', /* Green */
      borderRadius: 8,
      padding: 15,
      paddingLeft: 50, 
      paddingRight: 50,
      elevation: 3,
      fontSize: 18,
      fontFamily: 'Arial',
      marginTop: 20,
    },
    // question: {
    //   //border: '2px solid red',
    //   padding : '30px',
    //   textAlign: 'left',
    //   display: 'flex', // 使用 Flexbox 布局
    //   flexDirection: 'column', // 设置主轴方向为垂直方向
    //   alignItems: 'center', // 在主轴方向上居中
      
    // },
    buttonContainer: {
      marginTop:'20%',
      //border: '2px solid black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // 使按钮左侧对齐
    },
    wrap: {
      paddingBottom:7,
      width: '90%',
      //border: '2px solid green',
    },
    optionButton: {
      width: '90%', // 设置按钮宽度相同
      marginBottom: 2, // 根据需要调整内边距
      marginTop: 10, // 为按钮添加一些垂直间距
      textAlign:'left',
      backgroundColor:'white',
      border:'none',
      fontSize:18,
    },
  
    progressBar: {
      //border: '2px solid black',
      marginTop:40,
      marginBottom:30,
      width: '80%',
  
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between', // 让进度条和标签水平排列
      alignItems: 'center',
      //backgroundColor: 'lightgrey',
      //borderRadius:'5%',
    },
    bgbar: {
      width:'90%',
      backgroundColor: 'lightgrey',
    },
  
    progress: {
      backgroundColor: 'lightblue',
      height: 15,
      position: 'relative',
      
      //borderRadius:'50%',
      // ... (any other styles you want to keep for the progress bar background)
    },
    progressIndicator: {
      position: 'absolute',
      width: 25,
      height: 25,
      borderRadius: '50%',
      backgroundColor: 'skyblue',
      top: -6,
      right: 0,
      transform: 'translateX(50%)' // Adjust as needed
      // You might need to adjust the position based on the current progress
    },
    progressLabel: {
      display: 'inline-block',
      marginLeft: 10,
      float:'right',
      fontSize:18,
     
    },
    
  
  
    
   
  };
  

export default MobileComponent;
