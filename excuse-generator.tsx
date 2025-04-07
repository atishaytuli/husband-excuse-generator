"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  RefreshCw,
  Clock,
  Calendar,
  ThumbsUp,
  MessageCircle,
  Sparkles,
  Heart,
  ShieldAlert,
  Handshake,
  Flame,
  Info,
  Sun,
  HelpCircle,
  AlertTriangle,
  Trophy,
  Medal,
  Crown,
  Moon,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

// Mock ChatManager and ChatAIClass since we don't have access to the actual implementation
class ChatManager {
  constructor(description: string) {
    this.description = description
  }

  description: string
  messages: Array<{ role: string; content: string }> = []

  addMessage(role: string, content: string) {
    this.messages.push({ role, content })
  }

  async getCharacterResponse(type: string) {
    // In a real implementation, this would call an AI service
    // For demo purposes, we'll return a mock response
    const lastMessage = this.messages[this.messages.length - 1]
    const situation = lastMessage.content.replace("Generate an excuse for: ", "")

    const excuses = [
      `Hun, listen... I know I'm late for ${situation}, but you wouldn't believe what happened! I was actually on my way when I saw an elderly person who needed help crossing the street. I couldn't just drive by - you always say I should be more compassionate! I've done the math, and the karma points we just earned will definitely pay off in the future. Emoji: 👴`,
      `Hun, listen... about ${situation} - I was actually planning something special for us! I've been doing extensive research (like, hours of YouTube videos), and I wanted to surprise you with the perfect solution. Think about it this way - it's not procrastination, it's preparation for something amazing! Emoji: 🎁`,
      `Hun, listen... I know you're upset about ${situation}, but there was actually a major technical issue that was completely beyond my control! I'm talking MAJOR system failure. I've done everything humanly possible to fix it. Plus, think about how much I've learned from this experience... I listen to everything you say about being more resourceful! Emoji: 🔧`,
      `Hun, listen... I was totally on my way for ${situation}, but then I saw a cat stuck in a tree! You know how much we both love animals—I had to help! Plus, think about it, this just proves I'm responsible and caring. Wouldn't you want that in a husband? Emoji: 🐱`,
      `Hun, listen... about ${situation}, I actually did some deep research, and experts say a little delay actually increases appreciation! I mean, it's science! So technically, I'm making our time together even more special. Emoji: 🧪`,
      `Hun, listen... I was handling ${situation}, but then I got caught up in a very serious, top-secret mission. Okay, maybe it was just helping a friend with a minor emergency, but still, I'm basically a hero here. Emoji: 🦸‍♂️`,
      `Hun, listen... I was fully prepared for ${situation}, but then I had this incredible realization about life, love, and happiness... Okay, fine, I might've gotten distracted watching motivational videos, but trust me, I'm a better person now. Emoji: 🎓`,
    ]

    return excuses[Math.floor(Math.random() * excuses.length)]
  }
}

class ChatAIClass {
  chatManager: ChatManager

  constructor() {
    const AI_BEHAVIOR_DESCRIPTION = `
    You are a helpful AI assistant specializing in generating husband-style excuses for 
    various situations. When given a situation, create a loving, slightly 
    desperate, but endearing excuse about why this situation occurred or why something 
    wasn't done. Mix practical reasoning with subtle humor and occasional flattery. 
    Always start with "Hun, listen..." and include phrases like "it's actually better this way" 
    or "I've done the math" or "think about it this way...". Make it sound both sincere 
    and slightly amusing. End with a relevant emoji that matches the situation. 
    Format your response as: "Excuse: [excuse text] Emoji: [single emoji]"
  `
    this.chatManager = new ChatManager(AI_BEHAVIOR_DESCRIPTION)
  }

  async getResponse(prompt: string) {
    this.chatManager.addMessage("user", prompt)
    const response = await this.chatManager.getCharacterResponse("chat")
    this.chatManager.addMessage("assistant", response)
    return response
  }
}

// Function to trigger confetti
const triggerConfetti = () => {
  const duration = 1.5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)

    // Since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      }),
    )

    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      }),
    )
  }, 250)
}

// Helper function to get tips based on the excuse content
const getTipsForExcuse = (excuseText: string) => {
  if (!excuseText)
    return [
      { icon: <Clock className="h-4 w-4" />, text: "Timing is everything" },
      { icon: <Calendar className="h-4 w-4" />, text: "Plan a make-up date" },
      { icon: <ThumbsUp className="h-4 w-4" />, text: "Maintain eye contact" },
    ]

  const tips = []

  if (excuseText.toLowerCase().includes("late") || excuseText.toLowerCase().includes("time")) {
    tips.push({ icon: <Clock className="h-4 w-4" />, text: "Timing is everything" })
  } else {
    tips.push({ icon: <Clock className="h-4 w-4" />, text: "Choose the right moment" })
  }

  if (excuseText.toLowerCase().includes("special") || excuseText.toLowerCase().includes("surprise")) {
    tips.push({ icon: <Calendar className="h-4 w-4" />, text: "Plan something nice after" })
  } else {
    tips.push({ icon: <Calendar className="h-4 w-4" />, text: "Plan a make-up date" })
  }

  if (excuseText.toLowerCase().includes("listen") || excuseText.toLowerCase().includes("talk")) {
    tips.push({ icon: <ThumbsUp className="h-4 w-4" />, text: "Maintain eye contact" })
  } else {
    tips.push({ icon: <ThumbsUp className="h-4 w-4" />, text: "Use sincere body language" })
  }

  return tips
}

// FEATURE 1: Backup plans for when the excuse fails
const BACKUP_PLANS = [
  "Immediately compliment her outfit or hairstyle with specific details.",
  "Say you'll cook dinner (or order her favorite meal) and handle cleanup.",
  "Hand her your phone and say, 'Here, pick anything you want on Amazon. No budget.'",
  "Give her an 'I owe you one' coupon—valid for anything she wants, no questions asked.",
  "Bring up a sweet memory from your relationship to distract her: 'Remember when we first met...'",
  "Make a dramatic apology speech while kneeling—extra points for quoting her favorite movie.",
  "Surprise her with an impromptu dance move or song (the worse, the better).",
  "Say, 'I made a playlist that reminds me of you'—then actually make one on the spot!",
  "Offer a 5-minute massage that mysteriously turns into 30 minutes.",
  "Promise a planned-out romantic evening with no distractions—phones locked away.",
  "Pull out the 'I've been secretly planning your birthday/anniversary gift' card.",
  "The nuclear option: 'Your mother called, she wants us to visit this weekend.'",
  "Pretend you just got a notification about a sale at her favorite store.",
  "Say 'I was just thinking about how lucky I am to have you' with puppy dog eyes.",
  "The classic: 'Is that a new haircut? It looks amazing!'",
]

const getBackupPlan = () => BACKUP_PLANS[Math.floor(Math.random() * BACKUP_PLANS.length)]

// FEATURE 2: Determine the risk level of an excuse
const getExcuseRiskLevel = (excuseText: string) => {
  if (!excuseText) return "Low risk"

  if (excuseText.toLowerCase().includes("technical issue") || excuseText.toLowerCase().includes("learning")) {
    return "Low risk - Logical and believable."
  }

  if (excuseText.toLowerCase().includes("lost track of time") || excuseText.toLowerCase().includes("deep thinking")) {
    return "Medium risk - Requires good delivery."
  }

  if (excuseText.toLowerCase().includes("relationship experiment") || excuseText.toLowerCase().includes("science")) {
    return "High risk - May need a follow-up explanation!"
  }

  return "Very High Risk - Only use if you're feeling bold!"
}

// FEATURE 3: Mood-based excuses
const getExcuseForMood = (situation: string, mood: "happy" | "neutral" | "angry") => {
  const excuses = {
    happy: `Honey, listen... about ${situation}, I was actually thinking about a fun surprise for us, and I got so caught up in making it perfect that I lost track of time! But trust me, it's worth it. Emoji: 🎉`,
    neutral: `Honey, listen... for ${situation}, I *swear* I had everything planned, but something completely unpredictable happened. But hey, it makes life interesting, right? Emoji: 🤷`,
    angry: `Honey, listen... I messed up, no doubt about it. But I *promise* I'm making it up to you, and I'll do whatever it takes to fix it. Just tell me what I can do to make it better. Emoji: ❤️`,
  }
  return excuses[mood]
}

// Feature options with visual styling
const FEATURE_OPTIONS = [
  {
    id: "normal",
    name: "Classic Excuse",
    description: "Time-tested husband excuses",
    color:
      "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800",
    hoverColor: "hover:bg-violet-200 dark:hover:bg-violet-900/50",
    icon: <MessageCircle className="h-5 w-5" />,
    tooltip: "The classic excuse format that's worked for generations of husbands.",
    tagline: "The tried-and-true approach that has saved marriages since the dawn of time.",
  },
  {
    id: "mood",
    name: "Mood Reader",
    description: "Adapts to her emotional state",
    color: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800",
    hoverColor: "hover:bg-pink-200 dark:hover:bg-pink-900/50",
    icon: <Heart className="h-5 w-5" />,
    tooltip: "Customize your excuse based on whether she's happy, neutral, or angry. Reading the room is key!",
    tagline: "Because her mood is the difference between sleeping on the couch or in your bed.",
  },
  {
    id: "risk",
    name: "Risk Analyzer",
    description: "Know your odds of success",
    color:
      "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
    hoverColor: "hover:bg-yellow-200 dark:hover:bg-yellow-900/50",
    icon: <ShieldAlert className="h-5 w-5" />,
    tooltip: "Know your odds before you go in! Some excuses are safe bets, others could land you on the couch.",
    tagline: "For the strategic husband who likes to calculate his chances of survival.",
  },
  {
    id: "backup",
    name: "Plan B Master",
    description: "Emergency backup tactics",
    color:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
    hoverColor: "hover:bg-green-200 dark:hover:bg-green-900/50",
    icon: <Handshake className="h-5 w-5" />,
    tooltip: "Even the best excuses sometimes fail. Have a backup ready to deploy when things get dicey!",
    tagline: "Because even the best-laid plans can crumble under 'the look'.",
  },
  {
    id: "impact",
    name: "Apology Amplifier",
    description: "Control your remorse level",
    color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    hoverColor: "hover:bg-blue-200 dark:hover:bg-blue-900/50",
    icon: <Flame className="h-4 w-4" />,
    tooltip: "Control how apologetic your excuse sounds. Higher impact = more dramatic apology.",
    tagline: "Dial the drama from 'slightly sorry' to 'begging for forgiveness'.",
  },
]

// Mood options with visual styling
const MOOD_OPTIONS = [
  {
    id: "happy",
    name: "Sunshine Mode",
    description: "She's in a good mood",
    color:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
    hoverColor: "hover:bg-green-200 dark:hover:bg-green-900/50",
    emoji: "😊",
    tooltip: "She's already in a good mood - you're halfway there!",
    icon: <Sun className="h-4 w-4" />,
  },
  {
    id: "neutral",
    name: "Mystery Mood",
    description: "She's neither happy nor upset",
    color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    hoverColor: "hover:bg-blue-200 dark:hover:bg-blue-900/50",
    emoji: "😐",
    tooltip: "She could go either way - tread carefully!",
    icon: <HelpCircle className="h-4 w-4" />,
  },
  {
    id: "angry",
    name: "Danger Zone",
    description: "She's upset or frustrated",
    color: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
    hoverColor: "hover:bg-red-200 dark:hover:bg-red-900/50",
    emoji: "😠",
    tooltip: "Danger zone! Proceed with extra charm and sincerity!",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
]

// Helper function to determine impact level description
const getImpactLevelDescription = (level: number) => {
  if (level < 34) {
    return {
      text: "Mild",
      color: "text-green-600 dark:text-green-400",
      description: "A gentle, casual excuse with minimal apology.",
    }
  } else if (level < 67) {
    return {
      text: "Moderate",
      color: "text-amber-600 dark:text-amber-400",
      description: "More remorseful with clear signs of regret.",
    }
  } else {
    return {
      text: "Intense",
      color: "text-red-600 dark:text-red-400",
      description: "Full dramatic apology with maximum emotional impact!",
    }
  }
}

// Romantic quotes to display during generation
const ROMANTIC_QUOTES = [
  "Love finds a way...",
  "Words from the heart...",
  "Charm works wonders...",
  "A little sweetness goes far...",
  "Sincerity is key...",
  "The perfect words...",
  "Making it right...",
  "From the heart...",
  "Love and forgiveness...",
  "The art of reconciliation...",
  "A sincere heart fixes everything.",
  "Love is an art, and so are words.",
  "A little humor keeps love alive.",
  "A well-timed apology is priceless.",
  "The sweetest words heal the hardest hearts.",
  "A little patience makes love stronger.",
  "Charm, honesty, and timing—husband skills 101.",
  "The right words at the right time can move mountains.",
  "Love understands mistakes, effort matters most.",
  "Winning her heart back, one excuse at a time...",
]

// Common excuse scenarios for suggestions
const COMMON_EXCUSES = [
  "being late for dinner",
  "forgetting our anniversary",
  "buying a new gaming console",
  "not doing the dishes",
  "missing an important call",
  "spending too much money",
  "forgetting to reply to texts",
  "coming home late from work",
]

// Suggested prompts for the top of the UI
const SUGGESTED_PROMPTS = [
  {
    title: "Classic Excuses",
    description: "Generate time-tested husband excuses",
    icon: <MessageCircle className="h-5 w-5" />,
    feature: "normal",
  },
  {
    title: "Mood-Based",
    description: "Excuses that adapt to her emotional state",
    icon: <Heart className="h-5 w-5" />,
    feature: "mood",
  },
  {
    title: "Risk Analysis",
    description: "Know your odds of success",
    icon: <ShieldAlert className="h-5 w-5" />,
    feature: "risk",
  },
  {
    title: "Backup Plans",
    description: "Emergency tactics when excuses fail",
    icon: <Handshake className="h-5 w-5" />,
    feature: "backup",
  },
]

export default function ExcuseGenerator() {
  const [situation, setSituation] = useState("")
  const [excuse, setExcuse] = useState({ text: "", emoji: "😇" })
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuote, setCurrentQuote] = useState("")
  const [selectedFeature, setSelectedFeature] = useState<string>("normal")
  const [moodType, setMoodType] = useState<"happy" | "neutral" | "angry">("happy")
  const [backupPlan, setBackupPlan] = useState("")
  const [riskLevel, setRiskLevel] = useState("")
  const [angerImpact, setAngerImpact] = useState(46) // Default impact level
  const [isImpactOpen, setIsImpactOpen] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const [excuseLevel, setExcuseLevel] = useState<"amateur" | "pro" | "master">("amateur")
  const chatAI = useRef(new ChatAIClass())
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [moodLevel, setMoodLevel] = useState(50) // Default mood level

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Initialize dark mode based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(prefersDark)
    if (prefersDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Function to determine excuse level based on selected features and settings
  const calculateExcuseLevel = () => {
    let points = 0

    // Add points based on feature selection
    if (selectedFeature !== "normal") points += 1

    // Add points based on situation complexity
    if (situation.length > 20) points += 1

    // Add points based on impact level if that feature is selected
    if (selectedFeature === "mood" && moodType === "angry") points += 1

    // Determine level based on points
    if (points >= 3) return "master"
    if (points >= 1) return "pro"
    return "amateur"
  }

  // Function to get a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * ROMANTIC_QUOTES.length)
    return ROMANTIC_QUOTES[randomIndex]
  }

  const handleSituationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSituation(e.target.value)
    if (e.target.value.length > 0 && !showFeatures) {
      setShowFeatures(true)
    }
  }

  const handleSituationSelect = (excuse: string) => {
    setSituation(excuse)
    if (!showFeatures) {
      setShowFeatures(true)
    }
  }

  const handlePromptSelect = (feature: string) => {
    setSelectedFeature(feature)
    if (!showFeatures) {
      setShowFeatures(true)
    }
  }

  const handleFeatureSelect = (feature: string) => {
    setSelectedFeature(feature)
  }

  const handleMoodSelect = (mood: "happy" | "neutral" | "angry") => {
    setMoodType(mood)
  }

  const generateExcuse = async () => {
    if (!situation.trim()) return

    // Calculate excuse level before generating
    const level = calculateExcuseLevel()
    setExcuseLevel(level)

    // Start loading state
    setIsLoading(true)
    setCurrentQuote(getRandomQuote())

    try {
      // Simulate a delay of 1-2 seconds
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

      let excuseText = ""
      let emojiText = ""

      // Use different excuse generation based on the selected feature
      if (selectedFeature === "mood") {
        const moodExcuse = getExcuseForMood(situation, moodType)
        ;[excuseText, emojiText] = moodExcuse.split("Emoji:").map((t) => t.trim())
      } else {
        // Use the original AI for normal excuses
        const response = await chatAI.current.getResponse(`Generate an excuse for: ${situation}`)
        ;[excuseText, emojiText] = response.split("Emoji:").map((t) => t.trim())
        excuseText = excuseText.replace("Excuse:", "").trim()
      }

      // Modify the excuse based on anger impact if the "impact" feature is selected
      if (selectedFeature === "impact" && angerImpact > 50) {
        // Add more apologetic tone for higher impact
        const intensityMarker = "!".repeat(Math.floor(angerImpact / 20))
        excuseText = excuseText.replace("Hun, listen...", `Hun, PLEASE listen${intensityMarker}`)
        excuseText = excuseText + ` I'm REALLY sorry about this${intensityMarker}`
      }

      // Enhance excuse based on calculated level
      if (level === "pro") {
        excuseText = excuseText.replace("Hun, listen...", "Hun, I need to explain...")
        excuseText += " I promise this won't happen again."
      } else if (level === "master") {
        excuseText = excuseText.replace("Hun, listen...", "My darling, please hear me out...")
        excuseText += " You know how much I adore you, right?"
      }

      setExcuse({
        text: excuseText,
        emoji: emojiText || "😇",
      })

      // Generate backup plan if needed
      if (selectedFeature === "backup") {
        setBackupPlan(getBackupPlan())
      } else {
        setBackupPlan("")
      }

      // Generate risk level if needed
      if (selectedFeature === "risk") {
        setRiskLevel(getExcuseRiskLevel(excuseText))
      } else {
        setRiskLevel("")
      }

      if (excuseText) {
        setTimeout(() => {
          triggerConfetti()
        }, 300)
      }
    } catch (error) {
      console.error("Error generating excuse:", error)
      setExcuse({ text: "Oops! Something went wrong...", emoji: "😅" })
    }

    setIsLoading(false)
  }

  // Get dynamic tips based on the excuse content
  const tips = getTipsForExcuse(excuse.text)

  // Get impact level description
  const impactDesc = getImpactLevelDescription(angerImpact)

  // Get the selected feature's tagline
  const selectedFeatureTagline = FEATURE_OPTIONS.find((f) => f.id === selectedFeature)?.tagline || ""

  // Function to render the excuse level badge
  const renderExcuseLevelBadge = () => {
    if (excuseLevel === "amateur") {
      return (
        <Badge
          variant="outline"
          className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 flex items-center gap-1"
        >
          <Medal className="h-3 w-3" /> Amateur Excuser
        </Badge>
      )
    } else if (excuseLevel === "pro") {
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 flex items-center gap-1"
        >
          <Trophy className="h-3 w-3" /> Professional Excuser
        </Badge>
      )
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 flex items-center gap-1"
        >
          <Crown className="h-3 w-3" /> Master Excuser
        </Badge>
      )
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-zinc-900" : "bg-zinc-50"} flex flex-col`}>
      {/* Navbar */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10 bg-white dark:bg-zinc-900 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <motion.div
          className="container mx-auto px-4 py-3 flex justify-between items-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="bg-violet-600 text-white p-1.5 rounded-md"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <MessageCircle className="h-5 w-5" />
            </motion.div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Husband Excuse Generator</h1>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="outline" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDarkMode ? (
                <motion.div initial={{ rotate: 180 }} animate={{ rotate: 0 }} transition={{ duration: 0.4 }}>
                  <Sun className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div initial={{ rotate: -180 }} animate={{ rotate: 0 }} transition={{ duration: 0.4 }}>
                  <Moon className="h-5 w-5" />
                </motion.div>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Craft the perfect excuse</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Because survival matters. Choose your strategy below.
          </p>
        </div>

        {/* Feature selection at the top */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {FEATURE_OPTIONS.map((feature) => (
            <TooltipProvider key={feature.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all ${
                        selectedFeature === feature.id
                          ? feature.color
                          : "bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700"
                      } ${selectedFeature === feature.id ? "shadow-md" : "hover:shadow-md"}`}
                      onClick={() => handleFeatureSelect(feature.id)}
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <motion.div
                          className={`p-2 rounded-full mb-2 ${
                            selectedFeature === feature.id
                              ? "bg-white/20"
                              : "bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-gray-300"
                          }`}
                          animate={
                            selectedFeature === feature.id
                              ? {
                                  scale: [1, 1.1, 1],
                                  transition: {
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                    duration: 1.5,
                                  },
                                }
                              : {}
                          }
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="font-medium text-sm">{feature.name}</h3>
                        <p className="text-xs mt-1">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent className="p-3 max-w-xs dark:bg-zinc-800 dark:border-zinc-700">
                  <p>{feature.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Mood selector (only shown when mood feature is selected) */}
        {selectedFeature === "mood" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Card className="bg-pink-50 dark:bg-pink-900/10 border-pink-200 dark:border-pink-800">
              <CardContent className="p-4">
                <h3 className="font-medium text-pink-700 dark:text-pink-300 mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Her current mood:
                </h3>

                <div className="flex justify-between mb-4">
                  {MOOD_OPTIONS.map((mood) => (
                    <TooltipProvider key={mood.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleMoodSelect(mood.id as "happy" | "neutral" | "angry")}
                            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                              moodType === mood.id
                                ? "bg-white/50 dark:bg-white/10 shadow-sm"
                                : "hover:bg-white/30 dark:hover:bg-white/5"
                            }`}
                          >
                            <span className="text-2xl mb-1">{mood.emoji}</span>
                            <span className="text-xs font-medium">{mood.name}</span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="dark:bg-zinc-800 dark:border-zinc-700">
                          <p>{mood.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-pink-700 dark:text-pink-300">
                    <span>Mild</span>
                    <span>Intense</span>
                  </div>
                  <Slider
                    value={[moodLevel]}
                    min={0}
                    max={100}
                    step={1}
                    className="cursor-pointer"
                    onValueChange={(value) => setMoodLevel(value[0])}
                  />
                  <p className="text-xs text-center text-pink-600 dark:text-pink-400 mt-2">
                    Adjust the intensity of her {moodType} mood
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Main input card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="bg-white dark:bg-zinc-800 shadow-md mb-6 overflow-hidden border border-zinc-100 dark:border-zinc-700 rounded-xl">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-300">
                  <span>Generate an excuse for </span>
                  <div className="relative flex-1 min-w-[200px] mt-1">
                    <motion.div
                      animate={situation ? { x: 0 } : { x: [0, -2, 0, 2, 0] }}
                      transition={{ repeat: 5, repeatType: "mirror", duration: 0.2, repeatDelay: 3 }}
                    >
                      <Input
                        value={situation}
                        onChange={handleSituationChange}
                        placeholder="which situation Mr. Hubby ?"
                        className="border-0 border-b border-dashed border-gray-300 dark:border-gray-600 rounded-none px-1 py-0 h-auto focus-visible:ring-0 focus-visible:border-violet-500 dark:bg-transparent"
                        onKeyDown={(e) => e.key === "Enter" && !isLoading && generateExcuse()}
                      />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  <motion.div
                    className="flex flex-wrap gap-2 mt-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {COMMON_EXCUSES.map((excuse, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                        onClick={() => handleSituationSelect(excuse)}
                        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                          situation === excuse
                            ? "bg-violet-100 text-violet-700 border border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600"
                        }`}
                      >
                        {excuse}
                      </motion.button>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-end mt-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={generateExcuse}
                      disabled={isLoading || !situation.trim()}
                      className={`transition-all duration-300 rounded-full px-8 py-2 ${
                        isLoading || !situation.trim()
                          ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                          : "bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-700 dark:hover:bg-violet-800 shadow-sm hover:shadow"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </motion.div>
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            <span>Generate</span>
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {isLoading ? (
          <Card className="bg-white dark:bg-zinc-800 shadow-md border-0 overflow-hidden rounded-xl">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative h-20 w-20 mb-4">
                  {/* Animated stars/sparkles around the circle */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 0.8, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    >
                      <Sparkles
                        className="h-4 w-4 text-violet-500"
                        style={{
                          transform: `translate(${Math.cos((i * Math.PI) / 4) * 30}px, ${Math.sin((i * Math.PI) / 4) * 30}px)`,
                        }}
                      />
                    </motion.div>
                  ))}

                  {/* Pulsing circle */}
                  <motion.div
                    className="h-12 w-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(139, 92, 246, 0.3)",
                        "0 0 0 10px rgba(139, 92, 246, 0)",
                        "0 0 0 0 rgba(139, 92, 246, 0)",
                      ],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <MessageCircle className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                  </motion.div>
                </div>

                <motion.p
                  className="text-gray-600 dark:text-gray-400 text-center text-sm italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  "{currentQuote}"
                </motion.p>

                <motion.div
                  className="mt-4 text-violet-600 dark:text-violet-400 text-sm font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 0.5 }}
                >
                  Crafting the perfect words...
                </motion.div>
              </div>
            </CardContent>
          </Card>
        ) : (
          excuse.text && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card className="bg-white dark:bg-zinc-800 shadow-md border-0 overflow-hidden rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">Your Excuse</h3>
                      <div className="flex gap-2">
                        {selectedFeature !== "normal" && (
                          <div
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              FEATURE_OPTIONS.find((f) => f.id === selectedFeature)?.color ||
                              "bg-gray-100 dark:bg-gray-700"
                            }`}
                          >
                            {FEATURE_OPTIONS.find((f) => f.id === selectedFeature)?.name}
                          </div>
                        )}
                        {renderExcuseLevelBadge()}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-full hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-900/30 dark:hover:text-violet-400"
                      onClick={() => generateExcuse()}
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Regenerate</span>
                    </Button>
                  </div>

                  <motion.div
                    className="bg-gray-50 dark:bg-zinc-900 rounded-lg p-4 mb-4 relative overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute top-2 right-2">
                      <Sparkles className="h-4 w-4 text-violet-400" />
                    </div>

                    {/* Animated background sparkles */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-violet-300/30 dark:bg-violet-400/20"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          duration: 2 + Math.random() * 2,
                          delay: i * 0.5,
                          ease: "easeInOut",
                        }}
                      />
                    ))}

                    <motion.p
                      className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {excuse.text}
                    </motion.p>

                    <motion.div
                      className="text-center mt-3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <span className="text-3xl">{excuse.emoji}</span>
                    </motion.div>

                    {/* Show risk level if selected */}
                    {riskLevel && (
                      <motion.div
                        className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="flex items-center justify-between cursor-pointer">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Risk Level:{" "}
                                <span
                                  className={`${
                                    riskLevel.includes("Low risk")
                                      ? "text-green-600 dark:text-green-400"
                                      : riskLevel.includes("Medium risk")
                                        ? "text-yellow-600 dark:text-yellow-400"
                                        : riskLevel.includes("High risk")
                                          ? "text-orange-600 dark:text-orange-400"
                                          : "text-red-600 dark:text-red-400"
                                  }`}
                                >
                                  {riskLevel}
                                </span>
                              </p>
                              <Info className="h-4 w-4 text-gray-400" />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="p-3 text-sm dark:bg-zinc-800 dark:border-gray-700">
                            {riskLevel.includes("Low risk") && (
                              <p>
                                Safe bet! She'll likely accept this excuse with minimal questioning. Perfect for minor
                                situations.
                              </p>
                            )}
                            {riskLevel.includes("Medium risk") && (
                              <p>
                                Could go either way! Your delivery will make all the difference. Maintain eye contact
                                and speak with confidence.
                              </p>
                            )}
                            {riskLevel.includes("High risk") && (
                              <p>
                                Proceed with caution! This excuse requires excellent delivery and possibly a backup
                                plan. Be prepared for follow-up questions.
                              </p>
                            )}
                            {riskLevel.includes("Very High Risk") && (
                              <p>
                                Danger zone! Only the most charming husbands should attempt this excuse. Have a romantic
                                gesture ready just in case.
                              </p>
                            )}
                          </HoverCardContent>
                        </HoverCard>
                      </motion.div>
                    )}

                    {/* Show backup plan if selected */}
                    {backupPlan && (
                      <motion.div
                        className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="flex items-center justify-between cursor-pointer">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                If That Fails:{" "}
                                <span className="text-violet-600 dark:text-violet-400">{backupPlan}</span>
                              </p>
                              <Info className="h-4 w-4 text-gray-400" />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="p-3 text-sm dark:bg-zinc-800 dark:border-gray-700">
                            <p className="font-medium mb-1">Emergency Backup Plan</p>
                            <p>
                              No excuse is foolproof! This backup strategy is your safety net when she gives you "the
                              look" that means she's not buying it. Deploy immediately for best results!
                            </p>
                          </HoverCardContent>
                        </HoverCard>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-3 gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    {tips.map((tip, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-50 dark:bg-zinc-900 rounded-2xl p-3 text-center"
                        whileHover={{ scale: 1.03, backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex justify-center mb-1 text-violet-500">{tip.icon}</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{tip.text}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 mt-8">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            For those moments when{" "}
            <motion.span
              className="text-red-500 font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 2 }}
            >
              honesty
            </motion.span>{" "}
            isn't the best policy.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
            Saving Husbands Worldwide 💍 — By a Future-To-Be Husband
          </p>
        </motion.div>
      </footer>
    </div>
  )
}

