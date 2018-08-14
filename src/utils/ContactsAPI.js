/* 
 * The ContactAPI.js file was provided by Udacity. 
 * Comments by Kevin Hubert 
 */

/* Base-URL to server which hosts the REST-API */
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5001'

/* Load token if already exists */
let token = localStorage.token

/* Generate random token if no one exists yet. The token is used to have multiple ContactsList for multiple clients */
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

/* Standard HTTP-Request-Header-Parameter which are used for HTTP-Requests. */
const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/* Get all contacts based on my token */
export const getAll = () =>
  fetch(`${api}/contacts`, { headers })
    .then(res => res.json())
    .then(data => data.contacts)

/* Remove a contact from my contact-list */
export const remove = (contact) =>
  fetch(`${api}/contacts/${contact.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.contact)


/* Add a new contact to my contact-list based on my token */
export const create = (body) =>
  fetch(`${api}/contacts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())