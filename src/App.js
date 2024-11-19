import React, { useState, useEffect } from 'react'
import { X, Menu, User, Calendar, Trash2 } from 'lucide-react'

//composoant header/navbar fonctionnel et reponsive
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

//effet pour modifier le style du header au defilement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-black text-white' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl">MMA Ultimate Cage</span>
          </div>
          {/*Menu sous format ordinateur*/}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#" className="hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium">Evenements</a>
              <a href="#" className="hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium">Combattants</a>
              <a href="#" className="hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>
          {/*Responsive du menu*/}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none">
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        /*Menu sous format tablette/telephone si l'on clique sur le logo du menu hamburger*/
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Evenements</a>
            <a href="#" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Combattants</a>
            <a href="#" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </div>
      )}
    </nav>
  )
}

//Composant evenements
const Event = ({ event, onReserve }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{event.title}</h3>
        <p className="text-gray-700 text-base mb-2">{event.description}</p>
        <p className="text-gray-600 text-sm mb-4">{event.date} - {event.location}</p>
        <button
          onClick={() => onReserve(event)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Réserver une place
        </button>
      </div>
    </div>
  )
}

// Fonctions et constantes pour la data les prompt
export default function Component() {
  //data des evenements
  const [events, setEvents] = useState([
    { id: 1, title: 'UFC', description: 'Welterweight title fight', date: '2024-12-07', location: 'Las Vegas, NV', image: 'https://ringsideintel.com/cdn-cgi/image/width=1320,height=560,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2024/10/ufc-310.jpg?height=200&width=400' },
    { id: 2, title: 'PFL', description: 'Rising stars showcase', date: '2025-01-04', location: 'Lyon, FR', image: 'https://olvallee.twic.pics/wp-content/uploads/2024/05/PFL-Europe-Lyon-Finals-Keyart-708x433-1.png?height=200&width=400' },
    { id: 3, title: 'KSW', description: 'Le classico Français', date: '2024-12-21', location: 'Paris, FR', image: 'https://www.yoolabox.com/wp-content/uploads/2024/08/KSW.png?height=200&width=400' },
    {id : 4, title: 'PEF', description: 'Numero 1 du circuit amateur', date: '2024-12-21', location:'Lille, FR', image: 'https://cdn.shopify.com/s/files/1/0763/0513/7989/files/Sans_titre-3sferfg.jpg?v=1731329799?height=200&width=400'},
  ])

  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const storedReservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    setReservations(storedReservations)
  }, [])

  //ce qui s'active quand on reserve une place, pour mettre notre nom dans le prompt et stocker la data dans le localStorage
  const handleReserve = (event) => {
    const username = prompt('Entrez votre nom pour valider votre réservation')
    if (username) {
      const newReservation = { ...event, username, id: Date.now() } //id unique
      const updatedReservations = [...reservations, newReservation]
      setReservations(updatedReservations)
      localStorage.setItem('reservations', JSON.stringify(updatedReservations))
      alert(`Réservation faite pour ${event.title}!`)
    }
  }

  //fonction pour annuler une reservation grace au localStorage
  const handleCancelReservation = (reservationId) => {
    const updatedReservations = reservations.filter(reservation => reservation.id !== reservationId)
    setReservations(updatedReservations)
    localStorage.setItem('reservations', JSON.stringify(updatedReservations))
    alert('Réservation annulée avec succès!')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Prochains événements de MMA</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <Event key={event.id} event={event} onReserve={handleReserve} />
            ))}
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vos réservations</h2>
          {reservations.length > 0 ? (
            <ul className="bg-white shadow overflow-hidden sm:rounded-md">
              {reservations.map((reservation) => (
                <li key={reservation.id} className="px-4 py-4 sm:px-6 border-b last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-6 w-6 text-gray-400 mr-3" />
                      <p className="text-sm font-medium text-gray-900">{reservation.username}</p>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-6 w-6 text-gray-400 mr-3" />
                      <p className="text-sm text-gray-500">{reservation.date}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm text-gray-900">{reservation.title} - {reservation.location}</p>
                    <button
                      onClick={() => handleCancelReservation(reservation.id)}
                      className="flex items-center text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Annuler
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Vous n'avez pas encore de réservation</p>
          )}
        </div>
      </main>
    </div>
  )
}