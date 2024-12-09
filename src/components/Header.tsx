import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: ''
  })

  const {pathname} = useLocation()
  const isHome = useMemo(() => pathname === '/', [pathname])

  const fetchCategories = useAppStore((state)=> state.fetchCategories)
  const categories = useAppStore((state)=> state.categories)
  const searchRecipes = useAppStore((state)=> state.searchRecipes)
  const showNotification = useAppStore((state)=> state.showNotification)


  useEffect(()=>{
    fetchCategories()
  },[])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(Object.values(searchFilters).includes('')){
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    searchRecipes(searchFilters)
  }


  return (
    <header className={isHome ? 'bg-header bg-center bg-cover' : "bg-slate-800"}>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                    <img className="w-40" src="/logo.svg" alt="logotipo"/>
                

                <nav className="flex gap-5">
                    <NavLink to="/" className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold' }>Inicio</NavLink>
                    <NavLink to="/favoritos" className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold' }>Favoritos</NavLink>
                </nav>
            </div>
            {isHome && (
              <form onSubmit={handleSubmit} className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
                <div className="space-y-4">
                  <label
                  htmlFor="ingredient"
                  className="block text-white uppercase font-extrabold text-lg">Nombre o Ingredientes</label>
                  <input
                    id="ingredient"
                    type="text"
                    name="ingredient"
                    className="p-3 w-full rounded-lg"
                    placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                    onChange={handleChange}
                    value={searchFilters.ingredient}
                  />
                </div>
                <div className="space-y-4">
                  <label
                  htmlFor="category"
                  className="block text-white uppercase font-extrabold text-lg">Nombre o Ingredientes</label>
                  <select
                    id="category"
                    name="category"
                    className="p-3 w-full rounded-lg"
                    onChange={handleChange}
                    value={searchFilters.category}
                  >
                    {categories.drinks.map(category => (
                      <option value={category.strCategory} key={category.strCategory}>
                        {category.strCategory}</option>
                    ))}
                  </select>
                  <input
                type="submit"
                value='Buscar recetas'
                className="cursor-pointer bg-orange-800 hover:bg-orange-900 p-2 w-full font-extrabold rounded-lg uppercase text-white"
                />
                </div>
                
              </form>
            )}
        </div>
    </header>
  )
}
