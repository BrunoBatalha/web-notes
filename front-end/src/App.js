import React from 'react';
import Form from './Form';
import './global.css';

class App extends React.Component {

    render() {
        return (
            <>
                <h1 className='text-center bg-yellow py-4'>Web Notes</h1>
                <div className='container-fluid'>
                    <Form />
                </div>
            </>
        );
    }
}

export default App;
