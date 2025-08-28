Key Challenges & Solutions

1. Single Source of Truth for Data

Challenge: Avoid multiple API calls (in both Table and SummaryTable).

Solution: API was called only once in page.tsx. The fetched quotes were passed as props to both Table and SummaryTable, ensuring consistency and efficiency.

2. Real-Time Stock Price Updates

Challenge: Portfolio values were not updating automatically.

Solution: Used useEffect with setInterval to fetch updated Yahoo Finance quotes every 5 seconds. React useState re-renders ensured the table and summary updated live.

3. Portfolio Calculations

Challenge: Needed to compute investment, present value, and gain/loss per stock.

Solution:

investment = quantity × purchasePrice

presentValue = quantity × cmp

gainLoss = presentValue − investment

4. Sector-Wise Grouping

Challenge: Required aggregated view by sector (Financials, Technology, etc.).

Solution: In SummaryTable.tsx, grouped holdings using reduce to calculate sector-level totals (investment, present value, gain/loss).

5. Gain/Loss Color Indicator

Challenge: Needed clear profit/loss visibility.

Solution: Used Tailwind conditional styling:

Green text → when gainLoss >= 0

Red text → when gainLoss < 0
