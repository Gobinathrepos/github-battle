import React from 'react';
import PropTypes from 'prop-types';

// Here I'm seperately using a component call LanguagesNav
function LanguagesNav ({selected, onUpdateLanguage}) {
    const languages = ['All', 'CSS', 'Javascript', 'Python', 'Node']
        return (
            <ul className='flex-center'>
                {languages.map((language) => <li key={language}>
                    <button className='btn-clear nav-link'
                        onClick={() => onUpdateLanguage(language)}
                        style={language === selected ? {color: 'rgb(186, 46, 31)'} : null}
                        >
                        {language}
                    </button>
                </li>)}
            </ul>
        )
}

// We use propType to specific the item goes inside the type
LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired,
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props)
        // The nav-link will be default set to All
        this.state = {
                selectedLanguage: 'All'
            }
            this.updateLanguage = this.updateLanguage.bind(this)
            // We are using the bind to context the this in updateLanguage
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage
        })
    }

    render() {
        const {selectedLanguage} = this.state;
        return (

        <React.Fragment>
            {/* LanguagesNav Component */}
            <LanguagesNav
                selected={selectedLanguage}
                onUpdateLanguage={this.updateLanguage}
            />
        </React.Fragment>
        )
    }
}
