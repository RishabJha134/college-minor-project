// Premium Developer-Focused Color Tokens for SaaS AI Platform
export const colorTokens = {
  // Deep Slate/Indigo Background System
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  // Electric Cyan/Blue Accent System
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },
  // Indigo Primary System
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  // Success Green
  emerald: {
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
  },
  // Warning Amber
  amber: {
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
  },
  // Error Red
  red: {
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
  },
  // Neutral Grays
  grey: {
    0: "#FFFFFF",
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
};

export const themeSettings = (mode = "dark") => {
  const isDark = mode === "dark";
  
  return {
    palette: {
      mode: mode,
      // Primary: Electric Cyan for actions and emphasis
      primary: {
        main: isDark ? colorTokens.cyan[400] : colorTokens.cyan[600],
        light: colorTokens.cyan[300],
        dark: colorTokens.cyan[700],
        contrastText: colorTokens.slate[950],
      },
      // Secondary: Indigo for secondary actions
      secondary: {
        main: isDark ? colorTokens.indigo[400] : colorTokens.indigo[600],
        light: colorTokens.indigo[300],
        dark: colorTokens.indigo[700],
        contrastText: "#ffffff",
      },
      // Success
      success: {
        main: colorTokens.emerald[500],
        light: colorTokens.emerald[400],
        dark: colorTokens.emerald[600],
      },
      // Warning
      warning: {
        main: colorTokens.amber[500],
        light: colorTokens.amber[400],
        dark: colorTokens.amber[600],
      },
      // Error
      error: {
        main: colorTokens.red[500],
        light: colorTokens.red[400],
        dark: colorTokens.red[600],
      },
      // Background System
      background: {
        default: isDark ? colorTokens.slate[950] : colorTokens.grey[50],
        paper: isDark ? colorTokens.slate[900] : colorTokens.grey[0],
        surface: isDark ? colorTokens.slate[800] : colorTokens.grey[100],
        elevated: isDark ? colorTokens.slate[800] : colorTokens.grey[0],
      },
      // Text System
      text: {
        primary: isDark ? colorTokens.grey[50] : colorTokens.grey[900],
        secondary: isDark ? colorTokens.grey[400] : colorTokens.grey[600],
        disabled: isDark ? colorTokens.grey[600] : colorTokens.grey[400],
      },
      // Divider
      divider: isDark ? colorTokens.slate[700] : colorTokens.grey[200],
      // Custom semantic colors
      accent: {
        main: colorTokens.cyan[400],
        glow: `0 0 20px ${colorTokens.cyan[400]}40`,
      },
      code: {
        bg: isDark ? colorTokens.slate[800] : colorTokens.grey[100],
        border: isDark ? colorTokens.slate[700] : colorTokens.grey[300],
        text: colorTokens.cyan[400],
      },
    },
    // Typography System
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "sans-serif",
      ].join(","),
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: "1.75rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: "1.25rem",
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: 1.5,
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.75,
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.57,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.43,
      },
      button: {
        fontWeight: 600,
        fontSize: "0.875rem",
        textTransform: "none",
        letterSpacing: "0.02em",
      },
      caption: {
        fontSize: "0.75rem",
        lineHeight: 1.66,
      },
      overline: {
        fontSize: "0.75rem",
        fontWeight: 600,
        lineHeight: 2.66,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      },
      code: {
        fontFamily: [
          "JetBrains Mono",
          "Fira Code",
          "Monaco",
          "Consolas",
          "monospace",
        ].join(","),
        fontSize: "0.875rem",
      },
    },
    // Shape & Spacing
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    // Shadows (premium elevation system)
    shadows: [
      "none",
      `0px 2px 4px ${isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)"}`,
      `0px 4px 8px ${isDark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)"}`,
      `0px 8px 16px ${isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.10)"}`,
      `0px 12px 24px ${isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.12)"}`,
      `0px 16px 32px ${isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.14)"}`,
      // Neon glow shadows for accents
      `0 0 20px ${colorTokens.cyan[400]}40, 0 4px 12px rgba(0,0,0,0.4)`,
      `0 0 30px ${colorTokens.cyan[400]}50, 0 8px 16px rgba(0,0,0,0.5)`,
      // Continue standard shadows
      ...Array(17).fill(`0px 8px 16px ${isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.10)"}`),
    ],
    // Component overrides for consistent styling
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: "thin",
            scrollbarColor: `${isDark ? colorTokens.slate[700] : colorTokens.grey[400]} ${
              isDark ? colorTokens.slate[900] : colorTokens.grey[100]
            }`,
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: isDark ? colorTokens.slate[900] : colorTokens.grey[100],
            },
            "&::-webkit-scrollbar-thumb": {
              background: isDark ? colorTokens.slate[700] : colorTokens.grey[400],
              borderRadius: "4px",
              "&:hover": {
                background: isDark ? colorTokens.slate[600] : colorTokens.grey[500],
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
            padding: "10px 24px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: `0 4px 12px ${colorTokens.cyan[400]}40`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            transition: "all 0.3s ease-in-out",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorTokens.cyan[400],
                },
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorTokens.cyan[400],
                  borderWidth: "2px",
                  boxShadow: `0 0 0 3px ${colorTokens.cyan[400]}20`,
                },
              },
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: isDark
                ? `${colorTokens.slate[800]}80`
                : `${colorTokens.grey[200]}80`,
              transform: "scale(1.05)",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
    },
  };
};
