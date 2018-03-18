import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'



class ListContacts extends Component {

	static propTypes = {
		contacts: PropTypes.array.isRequired,
		onDeleteContact: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = query => this.setState({query: query.trim()})
	clearQuery = () => this.setState({query: ''})

	render() {
		const { contacts, onDeleteContact } = this.props
		const { query } = this.state

		let visibleContacts
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			visibleContacts = contacts.filter(contact => match.test(contact.name))
		} else {
			visibleContacts = contacts
		}

		visibleContacts.sort(sortBy('name'))

		return (
			<div className='list-contacts'>
				<div className='list-contacts-top'>
					<input 
						className='search-contacts'
						type='text'
						placeholder='Search contacts'
						value={query}
						onChange={event => this.updateQuery(event.target.value)}
					/>
					<Link 
						to='/create' 
						className='add-contact' 
						>	
						Add Contact
					</Link>
				</div>

				{visibleContacts.length !== contacts.length && (
					<div className='showing-contacts'>
						<span>Showing {visibleContacts.length} of {contacts.length} total</span>
						<button onClick={this.clearQuery}>Show all</button>
					</div>
				)}

				<ol className='contact-list'>
					{visibleContacts.map( contact => (
						<li key={contact.id} className='contact-list-item'>

							<div className='contact-avatar' style={{
								backgroundImage: `url(${contact.avatarURL})`
							}}/>

							<div className='contact-details'>
								<p>{contact.name}</p>
								<p>{contact.email}</p>
							</div>

							<button className='contact-remove' onClick={() => onDeleteContact(contact)}>
								Remove
							</button>

						</li>
					))}
				</ol>
				
			</div>
			
		)
	}
}

export default ListContacts;
