interface OnboardingData {
  name: string
  email: string
  birthDate: string
  height: string
  weight: string
  goal: string
  lifestyle: string
  time: string
  profilePicture: string
  preferences: string[]
}

export const getOnboardingDataFromStorage = (): OnboardingData | null => {
  try {
    const name = localStorage.getItem('onboarding_name')
    const email = localStorage.getItem('onboarding_email')
    const birthDate = localStorage.getItem('onboarding_birth_date')
    const height = localStorage.getItem('onboarding_height')
    const weight = localStorage.getItem('onboarding_weight')
    const goal = localStorage.getItem('onboarding_goal')
    const lifestyle = localStorage.getItem('onboarding_lifestyle')
    const time = localStorage.getItem('onboarding_time')
    const profilePicture = localStorage.getItem('onboarding_profile_picture')
    const preferencesStr = localStorage.getItem('onboarding_preferences')

    // Verificar se os dados essenciais existem
    if (!name || !email || !birthDate) {
      throw new Error('Dados essenciais do onboarding não encontrados')
    }

    const preferences = preferencesStr ? JSON.parse(preferencesStr) : []

    return {
      name,
      email,
      birthDate,
      height: height || '',
      weight: weight || '',
      goal: goal || '',
      lifestyle: lifestyle || '',
      time: time || '',
      preferences,
      profilePicture
    }
  } catch (error) {
    console.error('Erro ao recuperar dados do onboarding:', error)
    return null
  }
}

export const submitOnboarding = async (): Promise<{
  success: boolean
  message: string
  data?: any
}> => {
  try {
    const onboardingData = getOnboardingDataFromStorage()

    if (!onboardingData) {
      throw new Error('Dados do onboarding não encontrados')
    }

    const response = await fetch(
      'http://localhost:3000/api/onboarding',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(onboardingData)
      }
    )

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Erro ao enviar dados')
    }

    // Limpar localStorage após sucesso
    clearOnboardingData()

    return {
      success: true,
      message: result.message,
      data: result
    }
  } catch (error) {
    console.error('Erro ao enviar onboarding:', error)
    return {
      success: false,
      message: error.message || 'Erro ao processar onboarding'
    }
  }
}

export const clearOnboardingData = (): void => {
  const keys = [
    'onboarding_name',
    'onboarding_email',
    'onboarding_birth_date',
    'onboarding_height',
    'onboarding_weight',
    'onboarding_goal',
    'onboarding_lifestyle',
    'onboarding_time',
    'onboarding_preferences'
  ]

  keys.forEach(key => localStorage.removeItem(key))
}
