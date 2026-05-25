const projects = [
  {
    title: "Real-time ETL Pipeline",
    description: "Kafka + Spark Streaming pipeline processing 10M events/day",
    tags: ["Kafka", "Spark", "Python", "AWS"],
    link: "https://github.com/..."
  },
  // ...
]

import { motion } from "framer-motion"

// Wrap any section
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  {/* your content */}
</motion.div>