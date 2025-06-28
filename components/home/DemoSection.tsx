import { Pizza } from 'lucide-react';
import React from 'react';
import { MotionDiv, MotionH3 } from '../common/motion-wrapper';
import SummaryViewer from '../summaries/summary-viewer';

const dummySummary = `
# Introduction to AI
- Artificial Intelligence (AI) refers to machines simulating human intelligence.
- AI is transforming industries like healthcare, finance, and transportation.
- This summary provides an overview of key AI concepts and advancements.

# Machine Learning
- Machine Learning (ML) is a core subset of AI that enables systems to learn from data.
- Popular ML techniques include supervised, unsupervised, and reinforcement learning.
- Algorithms like Decision Trees, SVM, and Neural Networks are widely used.

# Deep Learning
- Deep Learning utilizes multi-layered neural networks to model complex patterns.
- It powers breakthroughs in computer vision, natural language processing, and speech recognition.
- Frameworks like TensorFlow and PyTorch accelerate deep learning development.

# AI in Real-world Applications
- AI is used in virtual assistants, autonomous vehicles, and medical diagnostics.
- Chatbots and recommendation systems improve customer experiences.
- AI models help detect fraud and optimize supply chains.

# Ethical Considerations
- AI raises concerns around privacy, bias, and job displacement.
- Responsible AI development focuses on fairness, transparency, and accountability.
- Global efforts are underway to regulate and guide ethical AI practices.

# Conclusion
- AI is revolutionizing the way we interact with technology.
- Continuous research and ethical development are crucial for AI's future.
- Businesses and society must adapt to leverage AI responsibly.
`;

const DemoSection = () => {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Watch how Sommaire{' '}
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                transform PDF{' '}
              </span>
              into an easy-to-read summary
            </MotionH3>
          </div>

          {/* Summary Pic */}
          <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
            <MotionDiv
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SummaryViewer summary={dummySummary} />
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
