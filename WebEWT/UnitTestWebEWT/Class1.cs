using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTestWebEWT
{
    [TestFixture]
    public class TestCase
    {
        [Test]
        public void Test()
        {
            var driver = new ChromeDriver();
            var baseUrl = "http://localhost:54841/";
            driver.Manage().Window.Maximize();
            driver.Navigate().GoToUrl(baseUrl);
            driver.FindElement(By.Id("goToGallery")).Click();
            Assert.AreEqual(driver.Url, baseUrl + "Image/Gallery");
        }

        [Test]
        public void Test2()
        {
            var temp = "bla";
            Assert.AreNotEqual(temp, "bla2");
        }
    }
}

/*
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TestWebEWT
{
    class Program
    {
        static void Main(string[] args)
        {
            var drivers = new List<IWebDriver>();
            drivers.Add(new ChromeDriver());
            drivers.Add(new FirefoxDriver());
            drivers.ForEach(Test);
        }

        public static void Test(IWebDriver driver)
        {
            var baseUrl = "http://localhost:54841/";
            driver.Manage().Window.Maximize();
            driver.Navigate().GoToUrl(baseUrl);
            driver.FindElement(By.Id("goToGallery")).Click();

            var images = driver.FindElements(By.ClassName("cell"));
            foreach (var img in images)
            {
                img.Click();
                driver.FindElement(By.Id("one-img")).Click();
            }

            Thread.Sleep(2000);
            driver.Quit();
            Console.Read();
        }
    }
}
*/
