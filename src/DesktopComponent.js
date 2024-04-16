import { questions } from './questionData';
//import { StyleSheet, Text, View } from 'react';
import React, { useState } from 'react';
import styled from 'styled-components';
import './Desktop.css';

const DesktopComponent = () => {
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
       <div className='container'>
        {!showResults ? (
            <div>
            {!showQuestions ? ( // 条件渲染问题页面或开始按钮
                <div className='start'>
                    <h2>Beck Depression Inventory (贝克抑郁量表)</h2>
                    <p>BDI测试表格1961年起草，根据抑郁症的专业机构指标的不断改进，也在不断调整。</p>
                    <p>它的严密和准确性也有很高的validility and reliability得分。被翻译成近20种语言，被各种机构应用。</p>
                    <p>请根据自己最近的情况，如实回答以下问题。</p>
                    <p>问卷需要10-15分钟完成。</p>
                    
                    {/* <button onClick={handleStartClick} style={styles.button}>开始</button> */}
                    <button className='startButton' onClick={handleStartClick}>开始</button>

                </div>
            ) : (
                <div className='buttonContainer'>
                    {/* <div style={styles.progressBar}>
                        <div style={{ width: `${progress}%`, backgroundColor: 'grey', height: 10 }}></div>
                    </div> */}
                    <div className='progressBar'>
                      <div className='bgbar'>
                        <div className="progress" style={{ width: `${progress}%` }}>
                          <div className="progressIndicator"></div>
                        </div>                   
                      </div>
                      <span className='progressLabel'>{`${currentQuestionIndex + 1}/${questions.length}`}</span>
                    </div>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <div key={index} className='wrap'> 
                            {/* <input type="checkbox" checked={false} onClick={() => handleOptionClick(option.score)}/> */}
                            <input 
                                type="checkbox" 
                                checked={selectedOption === option}
                                onChange={() => handleOptionClick(option, index)}
                                // checked={optionChecked[index]} 
                                // onMouseDown={() => handleOptionClick(option.score, index)}
                                // onMouseUp={() => handleOptionUnClick(option.score, index)}
                            />
                            <button className='optionButton' onClick={() => handleOptionClick(option, index)}>
                                {option.text}
                            </button>
                        </div>
                    ))}
                    
                </div>
            )}
            </div>
        ) : (
            <div className='start'>
            <p>恭喜您完成了所有问题。</p>
            <p>评测结果： 您的抑郁程度得分为{answer}，属于{getDepressionLevel(answer)}。</p>
            <p>此评测为自测，如有疑虑请预约专业评估机构进行评测。</p>
            </div>
        )}
    </div>
    );
}

export default DesktopComponent;
