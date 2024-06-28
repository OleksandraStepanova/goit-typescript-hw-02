import ReactModal from 'react-modal';
import { Image } from '../App.types';
ReactModal.setAppElement('#root');

type ImageModalProps = {
    isOpen: boolean;
    isClose: () => void;
    value: Image ;
}

export default function ImageModal({ isOpen, isClose, value }:ImageModalProps) {  

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={isClose}
            style={{
                content: {                 
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(-50%, -50%)',
                },
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.75)',
                }

            }}
        >
            {value && <img
                style={{
                    height: '80vh',
                }}
                src={value.urls.regular} alt={value.alt_description} />}
            {value && <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '32px',
                padding: '8px',
                color:'#6a20f3',
            }}>
                <p>Udername: {value.user.username}</p>
                <p>
                    Likes: {value.likes}</p>
            </div>}

        </ReactModal>
        )
}