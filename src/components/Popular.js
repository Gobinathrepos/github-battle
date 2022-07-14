import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

// Here I'm seperately using a component call LanguagesNav
function LanguagesNav ({selected, onUpdateLanguage}) {
    const languages = ['All', 'CSS', 'Javascript', 'Python', 'Node', 'Ruby']
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
                selectedLanguage: 'All',
                error: null,
                // This repos which is now a object itself where the selectedLanguage is a key to cache the repository
                repos: {},
                // when the screen is loading then error and repos should be null
            }
            this.updateLanguage = this.updateLanguage.bind(this)
            this.isLoading = this.isLoading.bind(this)
            // We are using the bind to context the this in updateLanguage
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage,
            error: null,
            // Because of caching we don't want the repos to none
        })
        // only fetch if the selectedLanguage is doesn't exist
        if(!this.state.repos[selectedLanguage]) {
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({ repos }) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                //  using catch for updating the UI
                .catch((error) => {console.warn('error fetching repos!', error)
                this.setState({
                    error: `There is a error in fetching the repos.`
                })
            })
        }
    }

    isLoading() {
        const {selectedLanguage, repos, error} = this.state;
        return !repos[selectedLanguage] && error === null
    }

    render() {
        const {selectedLanguage, error, repos} = this.state;
        return (

        <React.Fragment>
            {/* LanguagesNav Component */}
            <LanguagesNav
                selected={selectedLanguage}
                onUpdateLanguage={this.updateLanguage}
            />

            {this.isLoading() && <p>Loading...</p>}

            {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}

            {error && <p>{error}</p>}
        </React.Fragment>
        )
    }
}
