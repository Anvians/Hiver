const EMAILS_DB = [
  // CUST_A (Workflow & Auth Issues)
  {
    id: 1,
    customer_id: "CUST_A",
    tag: "access_issue",
    body: "I am getting a permission denied message when trying to access our shared mailbox.",
  },
  {
    id: 2,
    customer_id: "CUST_A",
    tag: "workflow_issue",
    body: "Our auto-assignment rule is no longer firing for emails with the word Refund.",
  },
  {
    id: 3,
    customer_id: "CUST_A",
    tag: "threading_issue",
    body: "Two replies from the same customer created different threads in Hiver.",
  },
  {
    id: 4,
    customer_id: "CUST_A",
    tag: "tagging_accuracy",
    body: "Tag suggestions are showing irrelevant tags like billing for product related emails.",
  },
  {
    id: 5,
    customer_id: "CUST_A",
    tag: "ui_bug",
    body: "Draft replies disappear when switching between conversations.",
  },
  {
    id: 6,
    customer_id: "CUST_A",
    tag: "automation_delay",
    body: "Our automation to mark emails as pending is taking 2-3 minutes to run.",
  },
  {
    id: 7,
    customer_id: "CUST_A",
    tag: "auth_issue",
    body: "Several users are unable to log in today. Getting 'invalid session'.",
  },
  {
    id: 8,
    customer_id: "CUST_A",
    tag: "export_issue",
    body: "Exporting conversations as CSV fails silently.",
  },
  {
    id: 9,
    customer_id: "CUST_A",
    tag: "notification_bug",
    body: "Agents are receiving duplicate desktop notifications.",
  },
  {
    id: 10,
    customer_id: "CUST_A",
    tag: "feature_request",
    body: "We want an option to bulk-apply tags to multiple emails.",
  },

  // CUST_B (Billing & Mobile)
  {
    id: 11,
    customer_id: "CUST_B",
    tag: "billing_error",
    body: "We were charged for 20 users though we only have 12 active.",
  },
  {
    id: 12,
    customer_id: "CUST_B",
    tag: "analytics_issue",
    body: "CSAT scores stopped generating since last week.",
  },
  {
    id: 13,
    customer_id: "CUST_B",
    tag: "performance",
    body: "Opening emails takes 10-12 seconds.",
  },
  {
    id: 14,
    customer_id: "CUST_B",
    tag: "mobile_bug",
    body: "Hiver app crashes whenever loading an attachment.",
  },
  {
    id: 15,
    customer_id: "CUST_B",
    tag: "sla_issue",
    body: "Our SLA rules aren't applied to emails from our VIP customers.",
  },
  {
    id: 16,
    customer_id: "CUST_B",
    tag: "tagging_issue",
    body: "Adding tags doesn't save unless we refresh.",
  },
  {
    id: 17,
    customer_id: "CUST_B",
    tag: "automation_bug",
    body: "Our workflow to create tasks is creating duplicates again.",
  },
  {
    id: 18,
    customer_id: "CUST_B",
    tag: "assignment_bug",
    body: "Emails are being assigned to the wrong agent.",
  },
  {
    id: 19,
    customer_id: "CUST_B",
    tag: "sync_issue",
    body: "IMAP sync halted unexpectedly.",
  },
  {
    id: 20,
    customer_id: "CUST_B",
    tag: "feature_request",
    body: "We want analytics from multiple teams in one dashboard.",
  },

  // CUST_C (Mail Merge & Search)
  {
    id: 21,
    customer_id: "CUST_C",
    tag: "mail_merge_issue",
    body: "Mail merge gets stuck processing at 0%.",
  },
  {
    id: 22,
    customer_id: "CUST_C",
    tag: "search_issue",
    body: "Searching for customer names yields no results.",
  },
  {
    id: 23,
    customer_id: "CUST_C",
    tag: "sync_bug",
    body: "Emails deleted yesterday reappear today.",
  },
  {
    id: 24,
    customer_id: "CUST_C",
    tag: "editor_bug",
    body: "Tables inserted in the editor lose formatting.",
  },
  {
    id: 25,
    customer_id: "CUST_C",
    tag: "attachment_issue",
    body: "Downloaded attachments appear corrupted.",
  },
  {
    id: 26,
    customer_id: "CUST_C",
    tag: "automation_issue",
    body: "Emails older than SLA should auto-close but remain open.",
  },
  {
    id: 27,
    customer_id: "CUST_C",
    tag: "csat_issue",
    body: "Customers aren't receiving CSAT surveys.",
  },
  {
    id: 28,
    customer_id: "CUST_C",
    tag: "ui_performance",
    body: "UI freezes when scrolling fast.",
  },
  {
    id: 29,
    customer_id: "CUST_C",
    tag: "notification_delay",
    body: "Users get notifications 5-7 minutes late.",
  },
  {
    id: 30,
    customer_id: "CUST_C",
    tag: "feature_request",
    body: "Dark mode would help our night shift team.",
  },

  // CUST_D (User Management & UI)
  {
    id: 31,
    customer_id: "CUST_D",
    tag: "analytics_bug",
    body: "Archived emails do not show up in Analytics.",
  },
  {
    id: 32,
    customer_id: "CUST_D",
    tag: "ui_bug",
    body: "Cards overlap in Kanban mode.",
  },
  {
    id: 33,
    customer_id: "CUST_D",
    tag: "user_management",
    body: "Error: 'Authorization missing' when adding a new agent.",
  },
  {
    id: 34,
    customer_id: "CUST_D",
    tag: "forwarding_issue",
    body: "Forwarding an email gives a server timeout.",
  },
  {
    id: 35,
    customer_id: "CUST_D",
    tag: "signature_bug",
    body: "Our signatures duplicate twice when replying.",
  },
  {
    id: 36,
    customer_id: "CUST_D",
    tag: "ui_state_bug",
    body: "Custom fields disappear after switching tabs.",
  },
  {
    id: 37,
    customer_id: "CUST_D",
    tag: "analytics_accuracy",
    body: "SLAs look incorrect in exported reports.",
  },
  {
    id: 38,
    customer_id: "CUST_D",
    tag: "suggestion_accuracy",
    body: "Smart suggestions propose the wrong KB articles.",
  },
  {
    id: 39,
    customer_id: "CUST_D",
    tag: "ui_bug",
    body: "The confetti animation plays repeatedly after resolving.",
  },
  {
    id: 40,
    customer_id: "CUST_D",
    tag: "information_request",
    body: "We want to build an integration; need updated API docs.",
  },

  // CUST_E (Delays & Drafts)
  {
    id: 41,
    customer_id: "CUST_E",
    tag: "sync_delay",
    body: "Email timestamps lag by 3-5 minutes.",
  },
  {
    id: 42,
    customer_id: "CUST_E",
    tag: "assignment_issue",
    body: "Emails revert to unassigned randomly.",
  },
  {
    id: 43,
    customer_id: "CUST_E",
    tag: "admin_ui_bug",
    body: "Cannot create new tags in admin panel.",
  },
  {
    id: 44,
    customer_id: "CUST_E",
    tag: "workflow_bug",
    body: "Testing workflows shows red error banner.",
  },
  {
    id: 45,
    customer_id: "CUST_E",
    tag: "draft_issue",
    body: "Draft disappears when switching tabs.",
  },
  {
    id: 46,
    customer_id: "CUST_E",
    tag: "analytics_issue",
    body: "CSAT count in dashboard doesn't match total responses.",
  },
  {
    id: 47,
    customer_id: "CUST_E",
    tag: "attachment_preview_bug",
    body: "Preview pane fails to load PDFs.",
  },
  {
    id: 48,
    customer_id: "CUST_E",
    tag: "automation_delay",
    body: "Incoming emails remain unassigned for up to 2 minutes.",
  },
  {
    id: 49,
    customer_id: "CUST_E",
    tag: "mobile_notification_issue",
    body: "Mobile users don't receive push notifications.",
  },
  {
    id: 50,
    customer_id: "CUST_E",
    tag: "feature_request",
    body: "We want a custom priority field for tickets.",
  },

  // CUST_F (Session & Search)
  {
    id: 51,
    customer_id: "CUST_F",
    tag: "duplication_bug",
    body: "Some incoming emails appear twice.",
  },
  {
    id: 52,
    customer_id: "CUST_F",
    tag: "logging_issue",
    body: "BCC participants do not show up in activity logs.",
  },
  {
    id: 53,
    customer_id: "CUST_F",
    tag: "session_issue",
    body: "Users get signed out every 30 minutes.",
  },
  {
    id: 54,
    customer_id: "CUST_F",
    tag: "editor_performance",
    body: "Typing in the composer is extremely slow.",
  },
  {
    id: 55,
    customer_id: "CUST_F",
    tag: "shortcut_bug",
    body: "Shortcuts like 'R' to reply aren't working.",
  },
  {
    id: 56,
    customer_id: "CUST_F",
    tag: "search_issue",
    body: "Global search gets stuck loading.",
  },
  {
    id: 57,
    customer_id: "CUST_F",
    tag: "workflow_bug",
    body: "Workflow rules don't save after clicking Submit.",
  },
  {
    id: 58,
    customer_id: "CUST_F",
    tag: "analytics_latency",
    body: "Stats update only once per hour.",
  },
  {
    id: 59,
    customer_id: "CUST_F",
    tag: "send_issue",
    body: "Emails remain in the outbox indefinitely.",
  },
  {
    id: 60,
    customer_id: "CUST_F",
    tag: "setup_help",
    body: "Not sure how to set SLA targets for different teams.",
  },
];
const KB_ARTICLES = [
  {
    id: "kb1",
    title: "Configuring Automations",
    content:
      "To configure automations, go to Settings > Automations. Triggers can be based on subject or sender. Actions include assigning to users or setting status.",
  },
  {
    id: "kb2",
    title: "CSAT Visibility",
    content:
      "CSAT scores only appear if 'Enable Surveys' is checked in Admin Panel. Surveys are sent 24 hours after a conversation is closed.",
  },
  {
    id: "kb3",
    title: "Billing Disputes",
    content:
      "For billing errors, download the invoice from the Billing Tab and email billing@hiver.com. Refunds take 3-5 days.",
  },
  {
    id: "kb4",
    title: "SLA Setup",
    content:
      "Service Level Agreements (SLAs) define response time targets. Go to Settings > SLAs to configure warnings for breached tickets.",
  },
  {
    id: "kb5",
    title: "Mail Merge Troubleshooting",
    content:
      "If Mail Merge is stuck at 0%, check if your CSV file has empty rows or special characters in headers.",
  },
  {
    id: "kb6",
    title: "Mobile App Issues",
    content:
      "For app crashes on attachment load, please update to version 2.4.1. This is a known bug in v2.3.",
  },
];


module.exports = {EMAILS_DB, KB_ARTICLES}