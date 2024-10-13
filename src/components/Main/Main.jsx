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
                <p>Gemini</p>
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
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
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
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
