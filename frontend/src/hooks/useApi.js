import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(url)
        const result = options.transform ? options.transform(response.data) : response.data
        setData(result)
      } catch (err) {
        setError(err)
        console.error(`API Error for ${url}:`, err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, user, options.transform])

  return { data, loading, error }
}

export const usePaginatedApi = (url, options = {}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  })
  const { user } = useAuth()

  const { filters = {}, limit = 10 } = options

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value)
        })
        params.append("limit", limit)

        const response = await axios.get(`${url}?${params}`)

        if (response.data.tickets) {
          // Tickets response format
          setData(response.data.tickets)
          setPagination({
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages,
            total: response.data.total,
          })
        } else if (response.data.incidents) {
          // Incidents response format
          setData(response.data.incidents)
          setPagination({
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages,
            total: response.data.total,
          })
        } else if (Array.isArray(response.data)) {
          // Simple array response
          setData(response.data)
          setPagination({
            currentPage: 1,
            totalPages: 1,
            total: response.data.length,
          })
        } else {
          setData(response.data)
        }
      } catch (err) {
        setError(err)
        console.error(`API Error for ${url}:`, err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, JSON.stringify(filters), limit, user])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
      params.append("limit", limit)

      const response = await axios.get(`${url}?${params}`)

      if (response.data.tickets) {
        setData(response.data.tickets)
        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          total: response.data.total,
        })
      } else if (response.data.incidents) {
        setData(response.data.incidents)
        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          total: response.data.total,
        })
      } else if (Array.isArray(response.data)) {
        setData(response.data)
        setPagination({
          currentPage: 1,
          totalPages: 1,
          total: response.data.length,
        })
      } else {
        setData(response.data)
      }
    } catch (err) {
      setError(err)
      console.error(`API Error for ${url}:`, err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, pagination, refetch }
}
