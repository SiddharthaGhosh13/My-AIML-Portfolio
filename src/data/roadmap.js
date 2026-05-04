import { FaCalculator, FaChartLine, FaBrain, FaRocket } from 'react-icons/fa'
import { GiCircuitry } from 'react-icons/gi'

export const roadmapPhases = [
  {
    id: 'phase-1',
    phase: 'Phase 1',
    title: 'Math & Python Foundations',
    months: 'Months 1–2',
    color: 'cyan',
    Icon: FaCalculator,
    description:
      'Linear Algebra, Calculus, Probability, Statistics, Advanced Python, NumPy, Pandas. Core Mathematical intuition for ML.',
  },
  {
    id: 'phase-2',
    phase: 'Phase 2',
    title: 'Core ML Algorithms',
    months: 'Months 3–5',
    color: 'amber',
    Icon: FaChartLine,
    description:
      'Supervised / Unsupervised learning, Tree models, SVMs, Clustering, Dimensionality reduction. Kaggle Competitions. Scikit-learn.',
  },
  {
    id: 'phase-3',
    phase: 'Phase 3',
    title: 'Deep Learning',
    months: 'Months 6–9',
    color: 'cyan',
    Icon: GiCircuitry,
    description:
      'Neural Networks, CNNs, RNNs, LSTMs, Transformers. PyTorch. Andrej Karpathy’s Curriculum. First Internship Target.',
  },
  {
    id: 'phase-4',
    phase: 'Phase 4',
    title: 'LLM Specialization',
    months: 'Months 10–14',
    color: 'amber',
    Icon: FaBrain,
    description:
      'Hugging Face Ecosystem, Fine-tuning (LoRA / QLoRA), RAG Systems, LangChain, Prompt Engineering, Model Evaluation, MLOps.',
  },
  {
    id: 'phase-5',
    phase: 'Phase 5',
    title: 'Build & Launch',
    months: 'Months 15–18',
    color: 'cyan',
    Icon: FaRocket,
    description:
      'MoralUP.AI AI Core Development, Open Source Contributions, Research Paper Reading + Replication, Full-Stack AI Application Deployment.',
  },
]
