import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
    const {
        onSent,
        showResult,
        loading,
        setInput,
        input,
        chatHistory
    } = useContext(Context);

    return (
        <div className='main'>
            <div className="nav">
                <p>Kaira-AI</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {showResult ? (
                    <div className="result">
                        {chatHistory.map((item, index) => (
                            <div key={index} className={`chat-item ${item.type}`}>
                                <div className='chat-item-title'>
                                    <img src={item.type === 'user' ? assets.user_icon : assets.gemini_icon} alt="" />
                                    <p>{item.type === 'user' ? 'You' : 'Gemini'}</p>
                                </div>
                                <div className="chat-item-content">
                                    {item.type === 'user' ? (
                                        <p>{item.content}</p>
                                    ) : (
                                        <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="loader">
                                <hr className="animated-bg" />
                                <hr className="animated-bg" />
                                <hr className="animated-bg" />
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="greet">
                            <p><span>Hello There!.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p> I’m so overwhelmed with work. There’s too much on my plate.</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>  : I just don’t feel motivated to do anything.</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p> I’m stressed about my upcoming exams. </p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>  don’t feel good enough compared to others.</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                        </div>
                    </>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder='Enter a prompt here' 
                        />
                        <div>
                            <img src={assets.gallery_icon} width={30} alt="" />
                            <img src={assets.mic_icon} width={30} alt="" />
                            {input && <img onClick={() => onSent()} src={assets.send_icon} width={30} alt="" />}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Made by team INNOV8ORS nmamit 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
