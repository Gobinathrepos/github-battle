import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';

// Here I'm seperately using a component call LanguagesNav
function LanguagesNav ({selected, onUpdateLanguage}) {
    const languages = ['All', 'CSS', 'Javascript', 'React', 'Node', 'Python', 'Ruby']
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

function ReposGrid ({repos}) {
    return (
        <ul className="grid space-around">
            {repos.map((repos, index) => {
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repos
                const { login, avatar_url } = owner;

                return (
                    <li key={html_url} className="repo bg-light">
                        <h4 className='header-lg text-center'>
                            #{index + 1}
                        </h4>
                        <img
                            className='avatar'
                            src={avatar_url}
                            alt={`Avatar for ${login}`}
                        />
                        <h2 className='center-text'>
                            <a className='link' href={html_url}>{login}</a>
                        </h2>
                        <ul className='card-list'>
                            <li>
                                <FaUser color='rgb(255, 191, 116)' size={22}/>
                                <a href={`https://github.com/${login}`}>{login}</a>
                            </li>
                            <li>
                                <FaStar color='rgb(255, 215, 0)' size={22}/>
                                {stargazers_count.toLocaleString()} stars
                            </li>
                            <li>
                                <FaCodeBranch color='rgb(129, 195, 245)' size={22}/>
                                {forks.toLocaleString()} forks
                            </li>
                            <li>
                                <FaExclamationTriangle color='rgb(241, 138, 147)' size={22}/>
                                {open_issues.toLocaleString()} open_issues
                            </li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
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

            {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}

            {error && <p>{error}</p>}
        </React.Fragment>
        )
    }
}
