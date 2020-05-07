import React from 'react';
import Form from './Form';
import './global.css';

class App extends React.Component {

    render() {
        return (
            <div className='container'>
                <h1 className='text-center pt-3'>Web Notes</h1>
                <div className='row'>
                    <Form />
                </div>
            </div>
        );
    }
}

export default App;
