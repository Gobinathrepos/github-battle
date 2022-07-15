import React from 'react';
import { FaTrophy, FaFighterJet, FaUserFriends } from 'react-icons/fa'

function Instruction() {
    return (
        <div className='instructions-container'>
            <h1 className='center-text header-lg'>
                Instruction
            </h1>
            <ol className='container-sm grid center-text battle-instructions'>
                <li>
                    <h3 className='header-sm'>Enter the two github user</h3>
                    <FaUserFriends className='bg-light' color='rgb(255, 191, 116)' size={145} />
                </li>
                <li>
                    <h3 className='header-sm'>Battle</h3>
                    <FaFighterJet className='bg-light' color='#727272' size={145} />
                </li>
                <li>
                    <h3 className='header-sm'>See the winners</h3>
                    <FaTrophy className='bg-light' color='rgb(255, 215, 0)' size={145} />
                </li>
            </ol>
        </div>
    )
}

export default class Battle extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Instruction />
            </React.Fragment>
        )
    }
}