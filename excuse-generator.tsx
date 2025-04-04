"use client"

import type React from "react"

import { useState, useRef } from "react"
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
  Globe,
  ShieldAlert,
  Handshake,
  Flame,
  Thermometer,
  Info,
  Sun,
  HelpCircle,
  AlertTriangle,
  ChevronDown,
  Lightbulb,
  Zap,
  Trophy,
  Medal,
  Crown,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

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
    color: "bg-violet-100 text-violet-700 border-violet-200",
    hoverColor: "hover:bg-violet-200",
    icon: <MessageCircle className="h-4 w-4" />,
    tooltip: "The classic excuse format that's worked for generations of husbands.",
    tagline: "The tried-and-true approach that has saved marriages since the dawn of time.",
  },
  {
    id: "mood",
    name: "Mood Reader",
    description: "Adapts to her emotional state",
    color: "bg-pink-100 text-pink-700 border-pink-200",
    hoverColor: "hover:bg-pink-200",
    icon: <Heart className="h-4 w-4" />,
    tooltip: "Customize your excuse based on whether she's happy, neutral, or angry. Reading the room is key!",
    tagline: "Because her mood is the difference between sleeping on the couch or in your bed.",
  },
  {
    id: "risk",
    name: "Risk Analyzer",
    description: "Know your odds of success",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    hoverColor: "hover:bg-yellow-200",
    icon: <ShieldAlert className="h-4 w-4" />,
    tooltip: "Know your odds before you go in! Some excuses are safe bets, others could land you on the couch.",
    tagline: "For the strategic husband who likes to calculate his chances of survival.",
  },
  {
    id: "backup",
    name: "Plan B Master",
    description: "Emergency backup tactics",
    color: "bg-green-100 text-green-700 border-green-200",
    hoverColor: "hover:bg-green-200",
    icon: <Handshake className="h-4 w-4" />,
    tooltip: "Even the best excuses sometimes fail. Have a backup ready to deploy when things get dicey!",
    tagline: "Because even the best-laid plans can crumble under 'the look'.",
  },
  {
    id: "impact",
    name: "Apology Amplifier",
    description: "Control your remorse level",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    hoverColor: "hover:bg-blue-200",
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
    color: "bg-green-100 text-green-700 border-green-200",
    hoverColor: "hover:bg-green-200",
    emoji: "😊",
    tooltip: "She's already in a good mood - you're halfway there!",
    icon: <Sun className="h-4 w-4" />,
  },
  {
    id: "neutral",
    name: "Mystery Mood",
    description: "She's neither happy nor upset",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    hoverColor: "hover:bg-blue-200",
    emoji: "😐",
    tooltip: "She could go either way - tread carefully!",
    icon: <HelpCircle className="h-4 w-4" />,
  },
  {
    id: "angry",
    name: "Danger Zone",
    description: "She's upset or frustrated",
    color: "bg-red-100 text-red-700 border-red-200",
    hoverColor: "hover:bg-red-200",
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
      color: "text-green-600",
      description: "A gentle, casual excuse with minimal apology.",
    }
  } else if (level < 67) {
    return {
      text: "Moderate",
      color: "text-amber-600",
      description: "More remorseful with clear signs of regret.",
    }
  } else {
    return {
      text: "Intense",
      color: "text-red-600",
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

  // Function to determine excuse level based on selected features and settings
  const calculateExcuseLevel = () => {
    let points = 0

    // Add points based on feature selection
    if (selectedFeature !== "normal") points += 1

    // Add points based on situation complexity
    if (situation.length > 20) points += 1

    // Add points based on impact level if that feature is selected
    if (selectedFeature === "impact" && angerImpact > 70) points += 1

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
        <Badge variant="outline" className="bg-gray-100 text-gray-700 flex items-center gap-1">
          <Medal className="h-3 w-3" /> Amateur Excuser
        </Badge>
      )
    } else if (excuseLevel === "pro") {
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-700 flex items-center gap-1">
          <Trophy className="h-3 w-3" /> Professional Excuser
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-700 flex items-center gap-1">
          <Crown className="h-3 w-3" /> Master Excuser
        </Badge>
      )
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
            Husband Excuse Generator <span className="text-red-500 animate-pulse">✽</span>
          </h1>
          <p className="text-gray-600 text-lg italic">Craft the perfect excuse—because survival matters. 😉</p>
        </div>

        <Card className="bg-white shadow-md mb-6 overflow-hidden border border-zinc-100 rounded-xl">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-lg text-gray-700">
                <span>Generate an excuse for </span>
                <div className="relative flex-1 min-w-[200px] mt-1">
                  <Input
                    value={situation}
                    onChange={handleSituationChange}
                    placeholder="which situation Mr. Hubby ?"
                    className="border-0 border-b border-dashed border-gray-300 rounded-none px-1 py-0 h-auto focus-visible:ring-0 focus-visible:border-violet-500"
                    onKeyDown={(e) => e.key === "Enter" && !isLoading && generateExcuse()}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {COMMON_EXCUSES.map((excuse, index) => (
                  <button
                    key={index}
                    onClick={() => handleSituationSelect(excuse)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      situation === excuse
                        ? "bg-violet-100 text-violet-700 border border-violet-200"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent"
                    }`}
                  >
                    {excuse}
                  </button>
                ))}
              </div>

              {/* Feature selection section - only shown after user types or selects something */}
              {showFeatures && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-600">Choose your feature:</p>
                    <div className="flex items-center">
                      <Lightbulb className="h-4 w-4 text-amber-500 mr-1" />
                      <p className="text-xs text-gray-500 italic">Enhance your excuse with special powers</p>
                    </div>
                  </div>

                  {/* Feature tagline that changes based on selection */}
                  {selectedFeatureTagline && (
                    <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center">
                      <Zap className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                      <p className="text-sm text-gray-600 italic">{selectedFeatureTagline}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {FEATURE_OPTIONS.map((feature) => (
                      <TooltipProvider key={feature.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => setSelectedFeature(feature.id)}
                              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                selectedFeature === feature.id
                                  ? `${feature.color} border-2`
                                  : `bg-white border-gray-200 ${feature.hoverColor}`
                              }`}
                            >
                              <div className="mb-1">{feature.icon}</div>
                              <span className="text-sm font-medium">{feature.name}</span>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs p-3">
                            <p>{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>

                  {/* Conditional secondary options based on selected feature */}
                  {selectedFeature === "mood" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <p className="text-sm text-gray-600 mb-2 flex items-center">
                        <ChevronDown className="h-4 w-4 mr-1 text-pink-500" />
                        Her current mood:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {MOOD_OPTIONS.map((mood) => (
                          <TooltipProvider key={mood.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => setMoodType(mood.id as "happy" | "neutral" | "angry")}
                                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                                    moodType === mood.id
                                      ? `${mood.color} border-2`
                                      : `bg-white border-gray-200 ${mood.hoverColor}`
                                  }`}
                                >
                                  <div className="flex flex-col items-center">
                                    <div className="mb-1">{mood.icon}</div>
                                    <span className="text-sm">{mood.name}</span>
                                    <span className="text-lg mt-1">{mood.emoji}</span>
                                  </div>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{mood.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Impact slider for anger level */}
                  {selectedFeature === "impact" && (
                    <Collapsible
                      open={true}
                      onOpenChange={setIsImpactOpen}
                      className="mt-4 border border-blue-200 rounded-xl p-4 bg-blue-50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-blue-700">
                          <Globe className="h-4 w-4" />
                          <span className="font-medium">Apology Intensity</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-1 rounded-md text-sm font-medium ${impactDesc.color}`}>
                            {angerImpact} - {impactDesc.text}
                          </div>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Info className="h-4 w-4 text-blue-500" />
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="h-4 w-4 text-blue-400" />
                        <div className="w-full flex-1">
                          <Slider
                            value={[angerImpact]}
                            min={0}
                            max={100}
                            step={1}
                            className="cursor-pointer"
                            onValueChange={(value) => setAngerImpact(value[0])}
                          />
                        </div>
                        <Flame className="h-4 w-4 text-orange-500" />
                      </div>

                      <CollapsibleContent className="mt-3 space-y-3">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Mild (0-33)</span>
                          <span>Moderate (34-66)</span>
                          <span>Intense (67-100)</span>
                        </div>

                        <div className="bg-blue-100/50 p-3 rounded-lg text-sm text-blue-700">
                          <p className="font-medium mb-1">Current Impact: {impactDesc.text}</p>
                          <p>{impactDesc.description}</p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </motion.div>
              )}

              <div className="flex justify-end mt-4">
                <Button
                  onClick={generateExcuse}
                  disabled={isLoading || !situation.trim()}
                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-8 py-2"
                >
                  {isLoading ? "Generating..." : "Generate"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <Card className="bg-white shadow-md border-0 overflow-hidden rounded-xl">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 bg-violet-500 rounded-full animate-pulse"></div>
                  <div
                    className="h-2 w-2 bg-violet-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-violet-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <p className="text-gray-600 text-center text-sm">"{currentQuote}"</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          excuse.text && (
            <Card className="bg-white shadow-md border-0 overflow-hidden rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-800">Your Excuse</h3>
                    <div className="flex gap-2">
                      {selectedFeature !== "normal" && (
                        <div
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            FEATURE_OPTIONS.find((f) => f.id === selectedFeature)?.color || "bg-gray-100"
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
                    className="h-8 w-8 p-0 rounded-full hover:bg-violet-50 hover:text-violet-600"
                    onClick={() => generateExcuse()}
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span className="sr-only">Regenerate</span>
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4 relative">
                  <div className="absolute top-2 right-2">
                    <Sparkles className="h-4 w-4 text-violet-400" />
                  </div>
                  <p className="text-gray-700 leading-relaxed mt-2">{excuse.text}</p>
                  <div className="text-center mt-3">
                    <span className="text-3xl">{excuse.emoji}</span>
                  </div>

                  {/* Show risk level if selected */}
                  {riskLevel && (
                    <div className="mt-4 border-t border-gray-200 pt-3">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="flex items-center justify-between cursor-pointer">
                            <p className="text-sm font-medium text-gray-700">
                              Risk Level:{" "}
                              <span
                                className={`${
                                  riskLevel.includes("Low risk")
                                    ? "text-green-600"
                                    : riskLevel.includes("Medium risk")
                                      ? "text-yellow-600"
                                      : riskLevel.includes("High risk")
                                        ? "text-orange-600"
                                        : "text-red-600"
                                }`}
                              >
                                {riskLevel}
                              </span>
                            </p>
                            <Info className="h-4 w-4 text-gray-400" />
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="p-3 text-sm">
                          {riskLevel.includes("Low risk") && (
                            <p>
                              Safe bet! She'll likely accept this excuse with minimal questioning. Perfect for minor
                              situations.
                            </p>
                          )}
                          {riskLevel.includes("Medium risk") && (
                            <p>
                              Could go either way! Your delivery will make all the difference. Maintain eye contact and
                              speak with confidence.
                            </p>
                          )}
                          {riskLevel.includes("High risk") && (
                            <p>
                              Proceed with caution! This excuse requires excellent delivery and possibly a backup plan.
                              Be prepared for follow-up questions.
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
                    </div>
                  )}

                  {/* Show backup plan if selected */}
                  {backupPlan && (
                    <div className="mt-4 border-t border-gray-200 pt-3">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="flex items-center justify-between cursor-pointer">
                            <p className="text-sm font-medium text-gray-700">
                              If That Fails: <span className="text-violet-600">{backupPlan}</span>
                            </p>
                            <Info className="h-4 w-4 text-gray-400" />
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="p-3 text-sm">
                          <p className="font-medium mb-1">Emergency Backup Plan</p>
                          <p>
                            No excuse is foolproof! This backup strategy is your safety net when she gives you "the
                            look" that means she's not buying it. Deploy immediately for best results!
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  )}

                  {/* Show impact level if selected */}
                  {selectedFeature === "impact" && (
                    <div className="mt-4 border-t border-gray-200 pt-3">
                      <p className="text-sm font-medium text-gray-700">
                        Intensity Level:{" "}
                        <span
                          className={`${
                            angerImpact < 34 ? "text-green-600" : angerImpact < 67 ? "text-yellow-600" : "text-red-600"
                          }`}
                        >
                          {angerImpact}% {angerImpact < 34 ? "(Mild)" : angerImpact < 67 ? "(Moderate)" : "(Intense)"}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {tips.map((tip, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-3 text-center">
                      <div className="flex justify-center mb-1 text-violet-500">{tip.icon}</div>
                      <p className="text-xs text-gray-600">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        )}

        <div className="text-center mt-6 text-gray-500 text-sm font-medium">
          For those moments when <span className="text-red-500 font-bold">honesty</span> isn't the best policy.
        </div>
      </div>

      <footer className="mt-12 py-4 text-center text-gray-700 text-sm ">
        <span className="font-medium text-gray-800">Saving Husbands Worldwide 💍—By a Future-To-Be Husband</span>
      </footer>
    </div>
  )
}

