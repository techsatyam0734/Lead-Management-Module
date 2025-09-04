import mongoose from "mongoose"

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?[0-9]{7,15}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    altPhone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^\+?[0-9]{7,15}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    altEmail: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return !v || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },

    status: {
      type: String,
      required: true,
      enum: ["New", "Follow-Up", "Qualified", "Converted"]
    },

    qualification: {
      type: String,
      enum: ["High School", "Bachelors", "PhD", "Other"]
    },

    interestField: {
      type: String,
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "Backend Development",
        "Frontend Development",
        "Full Stack Development",
        "Cloud Computing",
        "Cybersecurity",
        "Data Science",
        "Machine Learning",
        "Artificial Intelligence",
        "Blockchain",
        "IoT",
        "DevOps",
        "UI/UX Design",
        "Game Development",
        "Software Testing",
        "Other",
      ]
    },

    source: {
      type: String,
      required: true,
      enum: [
        "Website",
        "Social Media",
        "Email Campaign",
        "Phone Call",
        "Referral",
        "Advertisement",
        "Walk-in",
        "Event",
        "LinkedIn",
        "Facebook",
        "Instagram",
        "Twitter",
        "YouTube",
        "Google Ads",
        "Other",
      ]
    },

    assignedTo: {
      type: String,
      required: true,
      enum: ["John Doe", "Jane Smith", "Emily Davis", "Robert Johnson"]
    },

    jobInterest: {
      type: String,
      required: true,
      enum: [
        "Backend Developer",
        "Frontend Developer",
        "Full Stack Developer",
        "Mobile App Developer",
        "Data Analyst",
        "Data Scientist",
        "AI Engineer",
        "DevOps Engineer",
        "Cloud Engineer",
        "Cybersecurity Analyst",
        "Blockchain Developer",
        "UI/UX Designer",
        "QA/Tester",
        "IT Support",
        "Other",
      ]
    },

    state: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    passoutYear: {
      type: Number,
      required: true
    },

    heardFrom: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Lead = mongoose.model("Lead",leadSchema)
