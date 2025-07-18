import React, { useState } from 'react'
import { useAuth } from '../context/AuthContex';
import { useNavigate } from 'react-router-dom';

function Feedback() {

    const emojis = ["😡", "😞", "😐", "🙂", "😍"];
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [text, setText] = useState("");

    const { token } = useAuth();
    const navigate = useNavigate();

    const handleEmoji = (emoji) => {
        setSelectedEmoji(emoji);
        setText(prev => {
            return `${prev} ${emoji}`
        });
        setSelectedEmoji(null);
    }

    const submitFeedback = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text })
            });
            const data = await res.json();
            if (data.success) {
                navigate('/home')
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='w-full font-poppins'>
            <h2 className="text-lg font-semibold">Feedback</h2>
            <p className="mt-2 text-lg font-bold">Give us a feedback!</p>
            <p className="text-sm text-gray-600 mb-4">
                Your input is important for us. We take customer feedback very seriously.
            </p>

            <div className="flex gap-6 justify-start mb-6 text-3xl">
                {emojis.map((emoji, idx) => (
                    <button
                        key={idx}
                        onClick={() => { handleEmoji(emoji) }}
                        className={`hover:scale-110 transition ${selectedEmoji === idx ? "grayscale-0" : "grayscale"
                            }`}
                    >
                        {emoji}
                    </button>
                ))}
            </div>

            <textarea
                rows={3}
                placeholder="Add a comment"
                value={text}
                onChange={(e) => { setText(e.target.value) }}
                className="w-full border rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button className="mt-4 w-full md:w-1/2 bg-buttonColor text-white font-semibold py-2 rounded-md hover:bg-[#1f3d4c] transition"
                onClick={submitFeedback}>
                Submit Feedback
            </button>
        </div>
    )
}

export default Feedback