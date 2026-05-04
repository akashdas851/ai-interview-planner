import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"


export const useInterview = (interviewId) => {

    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        try {
            console.log("📊 Generating interview report...")
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            console.log("✅ Report generated successfully:", response.interviewReport)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.error("❌ Failed to generate report:", error.response?.data || error.message)
            alert("Failed to generate report: " + (error.response?.data?.message || error.message))
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (id) => {
        setLoading(true)
        try {
            console.log("📋 Fetching report:", id)
            const response = await getInterviewReportById(id)
            console.log("✅ Report fetched successfully:", response.interviewReport)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.error("❌ Failed to fetch report:", error.response?.data || error.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        try {
            console.log("📚 Fetching all reports...")
            const response = await getAllInterviewReports()
            console.log("✅ Reports fetched successfully:", response.interviewReports)
            setReports(response.interviewReports)
            return response.interviewReports
        } catch (error) {
            console.error("❌ Failed to fetch reports:", error.response?.data || error.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        try {
            console.log("📄 Generating resume PDF...")
            const response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            console.log("✅ Resume PDF generated and downloaded")
        }
        catch (error) {
            console.error("❌ Failed to generate PDF:", error.response?.data || error.message)
            alert("Failed to generate PDF: " + (error.response?.data?.message || error.message))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }

}