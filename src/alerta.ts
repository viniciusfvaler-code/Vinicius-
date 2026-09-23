let audio: AudioContext | undefined

/** Precisa ser chamado dentro de um toque do usuário (exigência do iOS para liberar o som). */
export function prepararAudio() {
  try {
    audio ??= new AudioContext()
    if (audio.state === 'suspended') void audio.resume()
  } catch {
    // navegador sem Web Audio
  }
}

function bipe(inicio: number, freq: number) {
  if (!audio) return
  const osc = audio.createOscillator()
  const ganho = audio.createGain()
  osc.frequency.value = freq
  ganho.gain.setValueAtTime(0.0001, inicio)
  ganho.gain.exponentialRampToValueAtTime(0.4, inicio + 0.02)
  ganho.gain.exponentialRampToValueAtTime(0.0001, inicio + 0.25)
  osc.connect(ganho).connect(audio.destination)
  osc.start(inicio)
  osc.stop(inicio + 0.3)
}

/** Fim do descanso: vibra (Android) e toca 3 bipes (iPhone não tem API de vibração). */
export function alertarFimDescanso() {
  navigator.vibrate?.([400, 150, 400, 150, 400])
  if (audio) {
    const t = audio.currentTime
    bipe(t, 880)
    bipe(t + 0.35, 880)
    bipe(t + 0.7, 1320)
  }
}
