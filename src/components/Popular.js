import React from 'react';

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

export default class Popular extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
                selectedLanguage: 'All'
            }
            this.updateLanguage = this.updateLanguage.bind(this)
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
            <LanguagesNav
                selected={selectedLanguage}
                onUpdateLanguage={this.updateLanguage}
            />
        </React.Fragment>
        )
    }
}